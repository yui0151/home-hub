// firebase-config.js
// Firebase 配置 + Google Sheet 串接 + 資料同步核心

const firebaseConfig = {
  apiKey: "AIzaSyAFGSQOvAp1thZkWBZ-nLHe-uR8llDQDI8",
  authDomain: "home-hub-be41f.firebaseapp.com",
  projectId: "home-hub-be41f",
  storageBucket: "home-hub-be41f.firebasestorage.app",
  messagingSenderId: "286497032414",
  appId: "1:286497032414:web:16d3f0242a400d0de85a4f"
};

// ════════════════════════════════════════════════════════════
// 1️⃣ Firebase 初始化
// ════════════════════════════════════════════════════════════

class FirebaseManager {
  constructor() {
    this.initialized = false;
    this.db = null;
    this.listeners = {};
    this.offlineCached = new Map();
  }

  // 初始化 Firebase
  async init() {
    if (this.initialized) return;

    // 動態載入 Firebase SDK
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
    script.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
      script2.onload = () => {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        
        // 啟用離線持久化
        this.db.enablePersistence()
          .catch(err => console.log('離線持久化已啟用或不支援'));
        
        this.initialized = true;
        this.updateConnectionStatus();
        document.dispatchEvent(new Event('firebaseReady'));
      };
      document.head.appendChild(script2);
    };
    document.head.appendChild(script);
  }

  // 監控連線狀態
  updateConnectionStatus() {
    const connectedRef = this.db.collection("status").doc("connection");
    connectedRef.onSnapshot(doc => {
      const isOnline = navigator.onLine;
      const statusEl = document.getElementById('connectionStatus');
      if (statusEl) {
        statusEl.innerHTML = isOnline 
          ? '● 連線正常（即時同步中）' 
          : '● 離線模式（資料已快取）';
      }
    }, err => {
      if (navigator.onLine) {
        console.warn('Firebase 連線異常，轉為離線模式');
      }
    });
  }

  // ═══ 讀取資料 ═══
  async read(collection, roomCode) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .doc(roomCode)
        .collection('items')
        .onSnapshot(snapshot => {
          const data = [];
          snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
          });
          resolve(data);
        }, reject);
    });
  }

  // ═══ 寫入資料 ═══
  async write(collection, roomCode, itemId, data) {
    return this.db.collection(collection)
      .doc(roomCode)
      .collection('items')
      .doc(itemId)
      .set({ ...data, lastModified: new Date() }, { merge: true });
  }

  // ═══ 批次寫入 ═══
  async batchWrite(collection, roomCode, items) {
    const batch = this.db.batch();
    items.forEach(item => {
      const docRef = this.db.collection(collection)
        .doc(roomCode)
        .collection('items')
        .doc(item.id || this.generateId());
      batch.set(docRef, { ...item, lastModified: new Date() }, { merge: true });
    });
    return batch.commit();
  }

  // ═══ 刪除資料 ═══
  async delete(collection, roomCode, itemId) {
    return this.db.collection(collection)
      .doc(roomCode)
      .collection('items')
      .doc(itemId)
      .delete();
  }

  // ═══ 批次刪除 ═══
  async batchDelete(collection, roomCode, itemIds) {
    const batch = this.db.batch();
    itemIds.forEach(id => {
      const docRef = this.db.collection(collection)
        .doc(roomCode)
        .collection('items')
        .doc(id);
      batch.delete(docRef);
    });
    return batch.commit();
  }

  // 生成唯一 ID
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // 即時監聽集合
  listenToCollection(collection, roomCode, callback) {
    const unsubscribe = this.db.collection(collection)
      .doc(roomCode)
      .collection('items')
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        callback(data);
      });
    
    // 儲存 unsubscribe 函數，供後續取消監聽
    this.listeners[`${collection}-${roomCode}`] = unsubscribe;
    return unsubscribe;
  }
}

// ════════════════════════════════════════════════════════════
// 2️⃣ Google Sheet API 整合（直接串接，自動同步）
// ════════════════════════════════════════════════════════════

class GoogleSheetManager {
  constructor() {
    this.sheetId = null;
    this.apiKey = null; // 使用者提供
  }

  // 設置 Google Sheet
  setSheet(sheetId, apiKey) {
    this.sheetId = sheetId;
    this.apiKey = apiKey;
    console.log('✅ Google Sheet 已連接:', sheetId);
  }

  // 解析 Google Sheet ID 從 URL
  static extractSheetId(url) {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  }

  // 從 Google Sheet 讀取資料
  async readFromSheet(sheetName = 'Sheet1') {
    if (!this.sheetId || !this.apiKey) {
      throw new Error('Google Sheet 未配置');
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${sheetName}?key=${this.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values || data.values.length < 1) {
      return [];
    }

    // 將 Sheet 資料轉換為物件陣列
    const headers = data.values[0];
    const rows = data.values.slice(1);

    return rows.map(row => {
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header.trim()] = row[idx] || '';
      });
      return obj;
    });
  }

  // 寫入資料到 Google Sheet（需要服務帳戶權限）
  // 注意：直接寫入需要使用 Service Account，此處提供備用方案
  async writeToSheet(data, sheetName = 'Sheet1') {
    console.warn('💡 提示：使用 Google Sheet 的共用編輯功能進行同步');
    console.log('建議流程：\n1. 共用 Google Sheet 給所有家庭成員\n2. 成員直接在 Sheet 中編輯\n3. 系統自動讀取更新');
  }
}

// ════════════════════════════════════════════════════════════
// 3️⃣ 資料同步管理器
// ════════════════════════════════════════════════════════════

class DataSyncManager {
  constructor(firebaseManager, googleSheetManager) {
    this.fb = firebaseManager;
    this.gs = googleSheetManager;
    this.syncInterval = 60000; // 每分鐘同步一次
    this.lastSyncTime = new Map();
  }

  // 啟動自動同步
  startAutoSync(collection, roomCode, sheetName) {
    setInterval(() => {
      this.syncFromSheet(collection, roomCode, sheetName);
    }, this.syncInterval);
  }

  // 從 Google Sheet 同步到 Firebase
  async syncFromSheet(collection, roomCode, sheetName) {
    try {
      const sheetData = await this.gs.readFromSheet(sheetName);
      const lastSync = this.lastSyncTime.get(`${collection}-${roomCode}`) || 0;
      
      // 檢查是否有新資料
      if (sheetData.length === 0) return;

      // 轉換資料格式
      const formattedData = this.formatSheetData(collection, sheetData);
      
      // 批次寫入 Firebase
      await this.fb.batchWrite(collection, roomCode, formattedData);
      
      this.lastSyncTime.set(`${collection}-${roomCode}`, Date.now());
      console.log(`✅ ${collection} 已從 Google Sheet 同步`);
      
      // 觸發更新事件
      document.dispatchEvent(new CustomEvent('dataSync', { 
        detail: { collection, roomCode, count: formattedData.length } 
      }));
    } catch (error) {
      console.error('同步失敗:', error);
    }
  }

  // 格式化 Sheet 資料
  formatSheetData(collection, sheetData) {
    return sheetData.map(row => {
      const item = { id: row.id || this.fb.generateId() };
      
      // 根據不同集合轉換欄位
      switch (collection) {
        case 'reminders':
          item.title = row.title || '';
          item.type = row.type || 'other';
          item.recurrence = row.recurrence || 'once';
          item.dueDate = row.dueDate || '';
          item.amount = parseFloat(row.amount) || 0;
          item.status = row.status || 'pending';
          break;
        
        case 'inventory':
          item.name = row.name || '';
          item.category = row.category || 'other';
          item.quantity = parseInt(row.quantity) || 0;
          item.unit = row.unit || '個';
          item.threshold = parseInt(row.threshold) || 0;
          item.location = row.location || '';
          break;
        
        case 'wardrobe':
          item.name = row.name || '';
          item.type = row.type || 'other';
          item.size = row.size || '';
          item.status = row.status || 'current';
          item.worn = row.worn === 'true' || row.worn === true;
          break;
        
        case 'wiki':
          item.title = row.title || '';
          item.category = row.category || 'other';
          item.url = row.url || '';
          item.tags = (row.tags || '').split(' ').filter(t => t);
          item.note = row.note || '';
          break;
      }
      
      return item;
    });
  }

  // 雙向同步：當 Firebase 有變更時通知用戶
  setupBidirectionalSync(collection, roomCode) {
    this.fb.listenToCollection(collection, roomCode, (data) => {
      // Firebase 資料變更，觸發 UI 更新
      document.dispatchEvent(new CustomEvent('firebaseUpdate', {
        detail: { collection, roomCode, data }
      }));
    });
  }
}

// ════════════════════════════════════════════════════════════
// 4️⃣ 初始化與全局變數
// ════════════════════════════════════════════════════════════

// 建立全局實例
const fbManager = new FirebaseManager();
const gsManager = new GoogleSheetManager();
const syncManager = new DataSyncManager(fbManager, gsManager);

// 自動初始化
document.addEventListener('DOMContentLoaded', async () => {
  await fbManager.init();
  
  // 從 localStorage 讀取 Google Sheet 配置
  const sheetConfig = localStorage.getItem('googleSheetConfig');
  if (sheetConfig) {
    const config = JSON.parse(sheetConfig);
    gsManager.setSheet(config.sheetId, config.apiKey);
  }
});

// 便利函數（供各模組調用）
async function getRoomCode() {
  return new URLSearchParams(window.location.search).get('room') || 'MY0918';
}

async function loadCollectionData(collection, roomCode) {
  return fbManager.read(collection, roomCode);
}

async function saveItem(collection, roomCode, itemId, data) {
  return fbManager.write(collection, roomCode, itemId, data);
}

async function deleteItem(collection, roomCode, itemId) {
  return fbManager.delete(collection, roomCode, itemId);
}

async function syncWithGoogleSheet(collection, roomCode, sheetName) {
  return syncManager.syncFromSheet(collection, roomCode, sheetName);
}
