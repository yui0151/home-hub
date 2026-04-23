# 🐣 M.Y 嘟嘟一家 育兒日記

> 專為嘟嘟一家打造的輕量化育兒日記 WebApp，隨手記錄女兒的每一天。

**🔗 App：** `yui0151.github.io/home-hub/diary.html`

---

## ✨ 功能總覽

| 功能 | 說明 |
|------|------|
| ✏️ 記錄 | 隨時新增文字、標籤、照片 |
| 📅 月回顧 | 按日期瀏覽當月所有紀錄 |
| 🔁 歷年今天 | 自動顯示過去同一天的紀錄 |
| 📅 補登過去 | 選擇日期補寫過去的紀錄 |
| 🖼 匯出圖片 | 以日為單位匯出日系手帳風格圖片 |
| 🏷️ 自訂標籤 | 可新增／刪除個人化標籤 |
| 💾 備份還原 | 匯出 JSON 備份，可匯入還原 |
| 📸 照片上傳 | 透過 Cloudinary 上傳，自動壓縮 |

---

## 🛠 技術架構

| 層 | 技術 |
|----|------|
| 前端 | 純 HTML / CSS / JS（無框架）|
| 資料庫 | Firebase Firestore |
| 照片儲存 | Cloudinary（免費 10GB）|
| 部署 | GitHub Pages |
| PWA | 可加入手機主畫面，icon 為嘟嘟 🐣 |

---

## 🔥 Firebase 設定

```js
const firebaseConfig = {
  apiKey: "AIzaSyAFGSQOvAp1thZkWBZ-nLHe-uR8llDQDI8",
  projectId: "home-hub-be41f",
  storageBucket: "home-hub-be41f.firebasestorage.app"
};
// Collection: diary_entries
// Settings: diary_settings/tags
```

---

## ☁️ Cloudinary 設定

```js
const CLOUDINARY_CLOUD = 'dxd5ijwof';
const CLOUDINARY_PRESET = 'ml_default'; // Unsigned
```

---

## 🗃 Firestore 資料結構

```
diary_entries/
  text        // 文字內容
  tags[]      // 標籤陣列
  photos[]    // Cloudinary 圖片網址
  dateStr     // "2026-04-22"
  timestamp   // ISO 8601
  year / month / day

diary_settings/tags
  list[]      // 自訂標籤列表
```

---

## 📋 使用說明

### 新增紀錄
1. 打開 App → ✏️ 記錄
2. 輸入文字、選標籤、上傳照片
3. 點「🌸 儲存這一筆」

### 補登過去
1. 記錄頁右上角點「📅 補登過去」
2. 選擇日期
3. 正常輸入儲存即可

### 匯出圖片
1. 切換到 📅 月回顧
2. 找到想匯出的日期，點右上角 **✦**
3. 預覽後點「💾 儲存圖片」

### 備份還原
1. 設定頁 → 備份與還原
2. 匯出 JSON 備份存到 Google Drive
3. 需要還原時選擇備份檔案匯入

---

## 🎨 設計系統

| 變數 | HEX | 用途 |
|------|-----|------|
| `--pink-deep` | `#D4849A` | 主色、按鈕 |
| `--pink-light` | `#FAE8EC` | 背景、標籤 |
| `--cream` | `#FDF6F0` | 全域背景 |
| `--text` | `#5C4A52` | 主要文字 |

字體：Zen Maru Gothic（日文圓體）

---

## 📸 照片上傳工具

獨立工具，用於走走地標等需要圖片網址的地方：

**`yui0151.github.io/home-hub/upload-tool.html`**

操作：選照片 → 自動上傳 → 複製網址 → 貼到 Google Sheets

---

*嘟嘟一家 🐣 · 育兒日記 v1.0 · 2026-04*
