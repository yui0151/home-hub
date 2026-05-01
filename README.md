# 🌙 嘟嘟一家 · 家庭數位管家

> 專為家庭打造的輕量化 Web App，免安裝，手機即用，全家即時同步。

**🔗 App：** https://yui0151.github.io/home-hub/

---

## 📁 檔案結構

```
home-hub/
├── index.html              # 🏡 首頁儀表板
├── module-reminders.html   # 📋 提醒系統
├── module-inventory.html   # 📦 庫存管理
├── module-wardrobe.html    # 👗 電子衣櫥
├── module-wiki.html        # 📖 小百科
├── icon.jpeg               # 🏠 PWA App 圖示
├── guide.html              # 📘 家人操作說明書
└── README.md
```

---

## ✨ 各模組功能

### 🏡 首頁
- 即時天氣 + 穿衣建議（Open-Meteo，自動定位）
- 四格統計（急件 / 低庫存 / 衣物數 / 書籤），點擊直接跳對應模組
- 快速記錄：備忘錄 / 待辦 / 待買，Tab 顯示未完成數量
- 急件提醒（3 天內到期）、本月費用彙總
- 庫存不足清單（點擊跳待買清單）
- 📌 精選書籤（同步小百科釘選書籤）

### 📋 提醒系統
- 6 種類型 × 9 種週期（單次 → 每年）
- 完成後自動計算下次日期並新增下一筆
- 完成時可填本次實際金額
- 分組顯示可收折（逾期 / 今天 / 7天內 / 其他 / 已完成）
- CSV 文字匯入

### 📦 庫存管理
- 10 種分類，Accordion 分組（預設收折）
- ⊞ 網格卡片 / ☰ 列表，列表顯示存放位置
- 排序：名稱（預設）/ 新增日期
- 快速 ± 數量，不需進詳情
- 📷 **Cloudinary 照片上傳**（點 📷 選相簿，自動上傳並顯示預覽）
- 警告值：`0` = 用完才提醒，`>0` = 低於閾值提醒
- **待買清單（Firebase 即時同步，全家共用）**
  - 庫存不足自動帶入：打勾（刪除線）、✕ 移除、一鍵清除已勾選
  - 自由新增區：打勾 + 刪除線、✕ 刪除、「清除已完成」一鍵清除
- CSV 文字匯入

### 👗 電子衣櫥
- 照片欄在最上方，新增時即時預覽，contain 完整顯示
- 詳情頁雙欄對稱排版，無圖顯示 👗 Emoji
- ⊞ / ☰ 切換，排序：新增日期（預設）/ 名稱
- 四格統計（總計 / 當季 / 非當季 / 未穿）
- 📌 釘選常穿衣物橫向快速區
- CSV 文字匯入

### 📖 小百科
- OG 預覽三層備援（jsonlink → microlink → allorigins）
- 無圖自動顯示分類 Emoji
- ⊞ / ☰ 切換，排序：新增日期（預設）/ 名稱
- Markdown 筆記含即時預覽
- 📌 釘選書籤同步首頁精選書籤
- CSV 文字匯入

---

## 📱 PWA（加到手機主畫面）

| 功能 | 說明 |
|---|---|
| Apple Touch Icon | 主畫面顯示房子圖示（`icon.jpeg`）|
| 全螢幕模式 | 開啟後無瀏覽器網址列，像原生 App |
| 主題色 | 狀態列配合奶茶色 `#A68A7D` |
| Manifest | 動態產生，不需額外 `.json` 檔案 |

**加到主畫面步驟：**
- iPhone：Safari → 分享 →「加入主畫面」
- Android：Chrome → 右上角 →「加到主畫面」

> 全螢幕模式沒有重新整理按鈕，可用下拉手勢或關掉重開更新。

---

## 🛠 技術架構

| 層 | 技術 |
|---|---|
| 前端 | React 18 CDN + Babel，純 CSS Variables |
| 資料庫 | Firebase Firestore compat SDK v9 |
| 照片上傳 | Cloudinary（cloud: `dxd5ijwof`，preset: `ml_default`）|
| 離線快取 | `enablePersistence()` |
| 天氣 | Open-Meteo（免費，無需 Key）|
| OG 預覽 | jsonlink.io → microlink.io → allorigins |
| 字體 | Noto Serif TC + Zen Kaku Gothic New |
| 部署 | GitHub Pages |

零 build step，直接上傳 HTML 即可部署。

---

## 🎨 設計系統

| 變數 | HEX | 用途 |
|---|---|---|
| `--paper` | `#FDFBFA` | 全域背景 |
| `--clay` | `#A68A7D` | 主色 |
| `--sage` | `#8FA68B` | 成功、完成 |
| `--wood` | `#4A423D` | 主要文字 |
| `--sand` | `#EAE2D6` | 邊框、分隔線 |
| `--highlight` | `#D99A84` | 警告、急件 |
| `--card` | `#F9F7F4` | 卡片背景 |

---

## 🔥 Firebase Config

```js
const firebaseConfig = {
  apiKey: "AIzaSyAFGSQOvAp1thZkWBZ-nLHe-uR8llDQDI8",
  authDomain: "home-hub-be41f.firebaseapp.com",
  projectId: "home-hub-be41f",
  storageBucket: "home-hub-be41f.firebasestorage.app",
  messagingSenderId: "286497032414",
  appId: "1:286497032414:web:16d3f0242a400d0de85a4f"
};
```

---

## 🗃 Firestore 資料結構

```
reminders/{roomCode}/items
  title, type, recurrence, dueDate, amount, description
  status, completionHistory[], createdAt, updatedAt

inventory/{roomCode}/items
  name, category, quantity, unit, threshold
  imageUrl, barcode, location, note, createdAt, updatedAt

shopping/{roomCode}/items          ← 待買清單（全家同步）
  text, done, createdAt

wardrobe/{roomCode}/items
  name, type, size, sleeve, source, status
  location, worn, note, imageUrl, pinned, createdAt, updatedAt

wiki/{roomCode}/articles
  title, category, tags[], url, imageUrl, note
  domain, og{}, pinned, createdAt, updatedAt
```

---

## 📋 CSV 匯入格式

各模組點右上角 📥 → 貼上 CSV 文字 → 匯入。每次為新增，不覆蓋現有資料。

```
庫存：name, category, quantity, unit, threshold, imageUrl, barcode, location, note
衣櫥：name, type, size, sleeve, source, status, location, worn, note, imageUrl
提醒：title, type, recurrence, dueDate, amount, description
百科：title, category, tags, url, imageUrl, note
```

---

## 🚀 部署

1. 上傳所有 `.html` + `icon.jpeg` 至 `yui0151/home-hub`
2. Settings → Pages → Source: `main` / root
3. 訪問 `https://yui0151.github.io/home-hub/`

---

## ⚠️ 開發守則

| 規則 | 原因 |
|---|---|
| Favicon 用外部檔案 `icon.jpeg`，不用 base64 | 20KB base64 塞在 HTML 裡阻塞 Babel 渲染 |
| JS 字串用 `\n`，不能有真實換行 | 單引號字串含真實換行 Babel 崩潰 |
| JSX 屬性裡不能用 `async` | `onChange={async e=>{}}` Babel standalone 不支援 |
| `storageBucket` 用 `.firebasestorage.app` | `.appspot.com` 連線失敗 |
| CSS 變數用 `--` hyphen，不是 `–` en dash | en dash 讓 CSS 變數全部失效 |

---

*嘟嘟一家 🌙 · Home Hub v3.3 · 2026-05-01*
