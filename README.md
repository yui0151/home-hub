# 🏡 家庭數位管家 · Home Hub

> 嘟嘟一家的家庭管理 Web App — 免安裝、手機優先、雲端同步

**🔗 Live Demo：** https://yamap610.github.io/home-hub/

---

## 📁 檔案結構

```
home-hub/
├── index.html              # 首頁儀表板（天氣、快速記錄、統計）
├── module-reminders.html   # 📋 提醒系統（帳單、訂閱、家務）
├── module-inventory.html   # 📦 庫存管理（品項、待買清單）
├── module-wardrobe.html    # 👗 電子衣櫥（衣物尺碼、換季）
├── module-wiki.html        # 📖 小百科（書籤、食譜、育兒資訊）
├── guide.html              # 📘 操作說明書（給家人看）
└── README.md               # 本文件
```

---

## ✨ 功能總覽

### 🏡 首頁
- 依時段問候語 + 今日天氣（Open-Meteo，自動定位）
- **快速記錄專區**：備忘錄 / 待辦事項 / 待買清單（localStorage 儲存）
- 四格統計卡：急件提醒 / 低庫存 / 衣物數 / 書籤數
- 急件提醒列表（3 天內到期）
- 本月財務費用彙總
- 庫存不足警示清單
- 精選書籤區（同步小百科釘選書籤）

### 📋 提醒系統
- 6 種類型 × 9 種週期（每日～每年）
- ✅ **完成後自動計算下次日期**，自動新增下一筆
- 💰 完成時可輸入本次**實際金額**（帳單金額每期可能不同）
- 本月財務費用橫幅統計
- 詳情頁預設唯讀，按 ✏️ 才進入編輯
- CSV 匯入

### 📦 庫存管理
- 11 種分類，Accordion 分組
- 快速 ± 數量按鈕（不需進詳情）
- 品項照片網址欄位
- 警告值邏輯：`0` = 用完才提醒，`>0` = 低於閾值提醒
- 待買清單：庫存不足自動帶入 + 自由填寫臨時項目
- 搜尋（名稱 / 條碼 / 位置）+ 分類篩選
- CSV 匯入

### 👗 電子衣櫥
- 四格統計（總計 / 當季 / 非當季 / 未穿過）
- 📌 釘選最愛橫向捲動快速區
- 照片封面顯示
- 狀態 × 類型雙重篩選
- CSV 匯入

### 📖 小百科
- 貼網址自動抓取 OG 標題 + 封面圖（三層備援）
- 📌 釘選書籤同步首頁「精選書籤」
- ⊞ 網格 / ☰ 列表切換
- Markdown 筆記編輯器（含即時預覽）
- 9 種分類 + 標籤搜尋
- CSV 匯入

---

## 🛠️ 技術架構

| 層級 | 使用技術 |
|------|---------|
| 前端框架 | React 18（CDN + Babel） |
| 樣式 | 純 CSS（CSS Variables） |
| 資料庫 | Firebase Firestore（compat SDK） |
| 離線支援 | `enablePersistence()` |
| 天氣 | Open-Meteo API（免費，無需 Key） |
| OG 預覽 | jsonlink.io → microlink.io → allorigins |
| 字體 | Noto Serif TC + Zen Kaku Gothic New |
| 部署 | GitHub Pages |

**無需 Node.js、無需 build step、直接上傳 HTML 即可使用。**

---

## 🎨 色彩系統

| 名稱 | HEX | 用途 |
|------|-----|------|
| Paper | `#FDFBFA` | 全域背景 |
| Clay | `#A68A7D` | 主色（按鈕、active） |
| Sage | `#8FA68B` | 成功、庫存充足 |
| Wood | `#4A423D` | 主要文字 |
| Sand | `#EAE2D6` | 邊框、分隔線 |
| Highlight | `#D99A84` | 警告、急件 |
| Card | `#F9F7F4` | 卡片背景 |

---

## 🗃️ Firebase 資料結構

房間碼作為隔離單位，不同家庭資料完全獨立。

```
reminders/{roomCode}/items      # 提醒項目
inventory/{roomCode}/items      # 庫存品項
wardrobe/{roomCode}/items       # 衣物
wiki/{roomCode}/articles        # 書籤 / 百科
```

---

## 🚀 部署方式

1. Fork 或直接上傳所有 `.html` 檔到此 repo
2. GitHub repo 設定 → Pages → Source 選 `main` branch，Folder 選 `/ (root)`
3. 等待約 1 分鐘，前往 `https://yamap610.github.io/home-hub/` 即可使用
4. 輸入家庭房間碼登入

---

## 📋 CSV 匯入格式

### 提醒系統
```csv
title,type,recurrence,dueDate,amount,description
水電費,financial,monthly,2026-05-10,1200,每月10號繳
Netflix,subscription,monthly,2026-05-15,390,
```

### 庫存管理
```csv
name,category,quantity,unit,threshold,imageUrl,barcode,location,note
雞蛋,food,10,顆,0,,,冰箱,
衛生紙,clean,3,包,2,,,浴室,
```

### 電子衣櫥
```csv
name,type,size,sleeve,source,status,location,worn,note,imageUrl
粉色包屁衣,洋裝/連身,80cm,短袖,自購,當季,臥室衣櫃,true,,
```

### 小百科
```csv
title,category,tags,url,imageUrl,note
嬰兒推車比較,baby,推車 育兒,https://example.com,,輕便型首選
```

---

## 🔒 安全說明

- Firebase API Key 為前端公開設計，屬正常做法
- 資料以**房間碼**隔離，不同家庭無法互相存取
- 建議在 Firebase Console 設定 Firestore 安全規則
- 如需更高安全性，可日後加入 Firebase Authentication

---

## 📘 操作說明書

開啟 [`guide.html`](./guide.html) 查看完整圖文說明書，適合分享給家庭成員閱讀。

---

*嘟嘟一家 Home Hub · v3.0 · 2026 · 以愛打造，為家庭服務 🏡*
