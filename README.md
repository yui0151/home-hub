# 🌙 嘟嘟一家 · 家庭數位管家

> 專為家庭打造的輕量化 Web App，免安裝，手機即用，全家即時同步。

**🔗 App：** https://yui0151.github.io/home-hub/
**📊 Google Sheet：** https://docs.google.com/spreadsheets/d/1U5eIIBD9B5z8yDfNOCBGjHYv1oODUX-HlI1CPbpO5UQ/edit

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
├── sheet-guide.html        # 📊 Google Sheet 匯入指南
└── README.md
```

---

## ✨ 功能總覽

### 🏡 首頁儀表板
- 即時天氣 + 穿衣建議（Open-Meteo，免費，自動定位）
- 四格統計卡（急件 / 低庫存 / 衣物數 / 書籤），低庫存點擊直接跳待買清單
- **快速記錄**：備忘錄 / 待辦 / 待買，Tab 旁顯示未完成數量 badge
- 急件提醒（3 天內）、本月 N 月費用彙總（已付刪除線）、精選書籤

### 📋 提醒系統
- 6 種類型 × 9 種週期
- 完成後**自動計算下次日期**並新增下一筆；完成時可填本次實際金額
- 分組顯示可收折（即將到期預設展開，其他 / 已完成預設收折）
- 📊 Google Sheet 匯入（工作表名含 `reminder`）

### 📦 庫存管理
- 10 種分類，Accordion 分組
- **⊞ 網格卡片 / ☰ 列表**兩種模式切換，列表顯示存放位置
- 右上角排序選單：**名稱**（預設）/ **新增日期**
- 快速 ± 數量（不需進詳情）
- 品項照片，無圖顯示分類 Emoji
- 警告值：`0` = 用完才提醒，`>0` = 低於閾值提醒
- **待買清單**：庫存不足自動帶入 + 自由填寫，點擊打勾 + 刪除線，✕ 永久刪除
- 📊 Google Sheet 匯入（工作表名含 `inventory`）

### 👗 電子衣櫥
- 照片欄位在最上方，新增時**即時預覽**；圖片 `contain` 完整顯示
- 詳情頁**雙欄對稱排版**；無圖顯示 👗 Emoji
- ⊞ 網格 / ☰ 列表切換
- 右上角排序選單：**新增日期**（預設）/ **名稱**
- 四格統計（總計 / 當季 / 非當季 / 未穿）
- 📌 釘選最愛橫向捲動快速區
- 📊 Google Sheet 匯入（工作表名含 `wardrobe`）

### 📖 小百科
- OG 預覽三層備援（jsonlink → microlink → allorigins）
- 無圖自動顯示分類 Emoji，不留白
- ⊞ 網格 / ☰ 列表切換
- 右上角排序選單：**新增日期**（預設）/ **名稱**
- Markdown 筆記含即時預覽
- 📌 釘選書籤同步首頁精選書籤
- 📊 Google Sheet 匯入（工作表名含 `wiki`，header 偵測支援中英文欄位名）

---

## 🛠 技術架構

| 層 | 技術 |
|---|---|
| 前端 | React 18（CDN）+ Babel，純 CSS Variables |
| 資料庫 | Firebase Firestore compat SDK v9 |
| 離線 | `enablePersistence()` |
| 天氣 | Open-Meteo API（免費，無需金鑰）|
| OG 預覽 | jsonlink.io → microlink.io → allorigins |
| 字體 | Noto Serif TC + Zen Kaku Gothic New |
| 部署 | GitHub Pages |

**零 build step，直接上傳 HTML 即部署。**

---

## 🎨 設計系統

### 色彩
| 變數 | HEX | 用途 |
|---|---|---|
| `--paper` | `#FDFBFA` | 全域背景 |
| `--clay` | `#A68A7D` | 主色（按鈕、active）|
| `--sage` | `#8FA68B` | 成功、充足 |
| `--wood` | `#4A423D` | 主要文字 |
| `--sand` | `#EAE2D6` | 邊框、分隔線 |
| `--highlight` | `#D99A84` | 警告、急件 |
| `--card` | `#F9F7F4` | 卡片背景 |

### 字體
- 標題：Noto Serif TC（400 / 500 / 700）
- 內文：Zen Kaku Gothic New（300 / 400 / 500）

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
reminders/{roomCode}/items       # title, type, recurrence, dueDate, amount, status, completionHistory[]
inventory/{roomCode}/items       # name, category, quantity, unit, threshold, imageUrl, barcode, location, note
wardrobe/{roomCode}/items        # name, type, size, sleeve, source, status, location, worn, note, imageUrl, pinned
wiki/{roomCode}/articles         # title, category, tags[], url, imageUrl, note, domain, og{}, pinned
```

---

## 📊 Google Sheet 匯入

**Sheet ID：** `1U5eIIBD9B5z8yDfNOCBGjHYv1oODUX-HlI1CPbpO5UQ`
**前置：** Sheet 須設定「知道連結的人可以**檢視**」

| 模組 | 工作表頁籤（含此字即可）| 欄位 |
|---|---|---|
| 📦 庫存 | `inventory` | name, category, quantity, unit, threshold, imageUrl, barcode, location, note |
| 👗 衣櫥 | `wardrobe` | name, type, size, sleeve, source, status, location, worn, note, imageUrl |
| 📋 提醒 | `reminder` | title, type, recurrence, dueDate, amount, description |
| 📖 百科 | `wiki` | title, category, tags, url, imageUrl, note |

> `tags` 多個標籤用**空格**分隔。每次匯入為**新增**，不覆蓋現有資料。

---

## 🚀 部署步驟

1. 上傳所有 `.html` 至 `yui0151/home-hub`
2. Settings → Pages → Source：`main` / `root`
3. 約 1 分鐘後訪問 `https://yui0151.github.io/home-hub/`
4. 輸入房間碼（`MY0918`）登入

---

## ⚠️ 重要開發守則

| 規則 | 原因 |
|---|---|
| Favicon 用 emoji inline SVG，**不用 base64** | base64 SVG 超過 100KB 會讓 Babel 崩潰白頁 |
| JS 字串裡用 `\n`，**不能有真實換行** | 單/雙引號字串含真實換行會讓 Babel 解析失敗 |
| `storageBucket` 用 `.firebasestorage.app` | `.appspot.com` 為舊格式，連線會失敗 |
| 所有模組統一 Firebase config | 版本不一致會造成 Firestore 連線錯誤 |

---

*嘟嘟一家 🌙 · Home Hub v3.1 · 2026-04-14*
