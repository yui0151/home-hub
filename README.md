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
- 低庫存清單（點擊跳待買清單）
- 📌 精選書籤（同步小百科釘選書籤）

### 📋 提醒系統
- 6 種類型 × 9 種週期（單次 → 每年）
- 完成後自動計算下次日期並新增下一筆
- 完成時可填本次實際金額
- 分組顯示可收折（逾期 / 今天 / 7天內 / 其他 / 已完成）
- 本月費用自動標注當月月份
- CSV 文字匯入

### 📦 庫存管理
- 10 種分類，Accordion 分組（預設收折）
- ⊞ 網格卡片 / ☰ 列表，列表顯示存放位置
- 右上角排序：名稱（預設）/ 新增日期
- 快速 ± 數量，不需進詳情
- 警告值：`0` = 用完才提醒，`>0` = 低於閾值提醒
- **待買清單**
  - 庫存不足自動帶入：打勾（刪除線）、✕ 單筆移除、一鍵清除已勾選
  - 自由新增區：打勾 + 刪除線、✕ 刪除、「清除已完成」一鍵清除
  - 狀態存 localStorage，重整不消失
- CSV 文字匯入

### 👗 電子衣櫥
- 照片欄在最上方，新增時即時預覽，`object-fit: contain`
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
- 📌 釘選書籤 → 同步顯示於首頁「精選書籤」
- CSV 文字匯入

---

## 🛠 技術架構

| 層 | 技術 |
|---|---|
| 前端 | React 18 CDN + Babel，純 CSS Variables |
| 資料庫 | Firebase Firestore compat SDK v9 |
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

字體：Noto Serif TC（標題）/ Zen Kaku Gothic New（內文）

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

wardrobe/{roomCode}/items
  name, type, size, sleeve, source, status
  location, worn, note, imageUrl, pinned, createdAt, updatedAt

wiki/{roomCode}/articles
  title, category, tags[], url, imageUrl, note
  domain, og{}, pinned, createdAt, updatedAt
```

---

## 📋 CSV 匯入格式

各模組點右上角 📥 → 貼上 CSV 文字 → 匯入。

```
庫存：name, category, quantity, unit, threshold, imageUrl, barcode, location, note
衣櫥：name, type, size, sleeve, source, status, location, worn, note, imageUrl
提醒：title, type, recurrence, dueDate, amount, description
百科：title, category, tags, url, imageUrl, note
```

category 值（庫存）：`food drink frozen clean bath medical baby kitchen office other`
type 值（提醒）：`financial subscription consumable chore health other`
recurrence 值：`once daily weekly biweekly monthly bimonthly quarterly semiannual yearly`

---

## 🚀 部署

1. 上傳所有 `.html` 至 `yui0151/home-hub`
2. Settings → Pages → Source: `main` / root
3. 訪問 `https://yui0151.github.io/home-hub/`

---

## ⚠️ 開發守則

| 規則 | 原因 |
|---|---|
| Favicon 用 emoji inline SVG，不用 base64 | 100KB+ base64 讓 Babel OOM 白頁 |
| JS 字串用 `\n`，不能有真實換行 | 單引號字串含真實換行 Babel 崩潰 |
| `storageBucket` 用 `.firebasestorage.app` | `.appspot.com` 連線失敗 |

---

*嘟嘟一家 🌙 · Home Hub v3.2 · 2026-04-15*
