# 🌙 嘟嘟一家 · 家庭數位管家

> 專為家庭打造的輕量化 Web App，免安裝，手機即用，全家即時同步。

**🔗 App 網址：** https://yui0151.github.io/home-hub/
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

### 🏡 首頁
- 即時天氣 + 穿衣建議（Open-Meteo，免費自動定位）
- 四格統計卡：急件 / 低庫存 / 衣物數 / 書籤數，點擊直接跳轉
- **快速記錄**：備忘錄（自動儲存）/ 待辦 / 待買，各 Tab 顯示未完成計數
- 急件提醒（3天內到期）
- 本月費用彙總（顯示月份，已付刪除線），低庫存清單點擊跳待買清單
- 精選書籤（同步小百科釘選書籤）

### 📋 提醒系統
- 6 種類型 × 9 種週期
- 完成後**自動計算並新增下次日期**，完成時可輸入本次實際金額
- 分組顯示可收折（即將到期展開，其他/已完成收折）
- 本月費用橫幅標注月份
- 詳情頁預設唯讀，按 ✏️ 編輯
- 📊 Google Sheet 匯入（工作表名含 `reminder`）

### 📦 庫存管理
- 10 種分類，Accordion 預設展開
- **⊞ 卡片 / ☰ 列表切換**：卡片模式 2 欄網格（含圖片/Emoji），列表模式顯示存放位置
- 右上角排序選單：名稱（A→Z）/ 新增日期
- 快速 ± 數量（卡片和列表模式均可）
- 品項照片（contain 不裁切，無圖顯示分類 Emoji）
- 警告值：`0` = 用完才提醒，`>0` = 低於閾值提醒
- **待買清單**：庫存不足自動帶入 + 自由填寫，打勾顯示刪除線，✕ 永久刪除
- 詳情頁預設唯讀，按 ✏️ 編輯
- 📊 Google Sheet 匯入（工作表名含 `inventory`）

### 👗 電子衣櫥
- ⊞ 卡片 / ☰ 列表切換
- 照片欄位在最上方，新增時**即時預覽**，照片 contain 不裁切，無圖顯示 👗
- 詳情頁**雙欄對稱排版**（類型/尺碼、袖長/來源、狀態/已穿）
- 四格統計（總計 / 當季 / 非當季 / 未穿）
- 📌 釘選最愛橫向捲動區
- 排序選單：新增日期（預設）/ 名稱
- 詳情頁預設唯讀，按 ✏️ 編輯
- 📊 Google Sheet 匯入（工作表名含 `wardrobe`）

### 📖 小百科
- 貼網址自動抓取 OG 標題 + 封面圖（三層備援：jsonlink → microlink → allorigins）
- 無圖自動顯示分類 Emoji，不留白
- 📌 釘選書籤同步首頁精選書籤
- ⊞ 網格 / ☰ 列表切換，照片 contain 不裁切
- Markdown 筆記（含即時預覽）
- 9 種分類 + 標籤搜尋
- 排序選單：新增日期（預設）/ 名稱
- 詳情頁預設唯讀，按 ✏️ 編輯
- 📊 Google Sheet 匯入（工作表名含 `wiki`）

---

## 🛠 技術架構

| 層 | 技術 |
|---|---|
| 前端 | React 18（CDN）+ Babel |
| 樣式 | 純 CSS Variables |
| 資料庫 | Firebase Firestore（compat SDK v9）|
| 離線 | `enablePersistence()` |
| 天氣 | Open-Meteo API（免費無需金鑰）|
| OG 預覽 | jsonlink.io → microlink.io → allorigins |
| 字體 | Noto Serif TC + Zen Kaku Gothic New |
| 部署 | GitHub Pages |

> 零 build step，直接上傳 HTML 即部署。

---

## 🎨 設計系統

```css
--paper: #FDFBFA   /* 全域背景 */
--clay:  #A68A7D   /* 主色（按鈕、active）*/
--sage:  #8FA68B   /* 成功、充足 */
--wood:  #4A423D   /* 主要文字 */
--sand:  #EAE2D6   /* 邊框、分隔線 */
--highlight: #D99A84 /* 警告、急件、待買 */
--card:  #F9F7F4   /* 卡片背景 */
```

字體：**Noto Serif TC**（標題）+ **Zen Kaku Gothic New**（內文）
Favicon：🌙 emoji inline SVG（不用 base64，避免 Babel 崩潰）

---

## 🗃 Firebase 資料結構

```
Firebase 專案：home-hub-be41f
storageBucket：home-hub-be41f.firebasestorage.app

reminders/{roomCode}/items     → title, type, recurrence, dueDate, amount, description, status, completionHistory[]
inventory/{roomCode}/items     → name, category, quantity, unit, threshold, imageUrl, barcode, location, note
wardrobe/{roomCode}/items      → name, type, size, sleeve, source, status, location, worn, note, imageUrl, pinned
wiki/{roomCode}/articles       → title, category, tags[], url, imageUrl, note, domain, og{}, pinned
```

---

## 📊 Google Sheet 匯入

**Sheet ID：** `1U5eIIBD9B5z8yDfNOCBGjHYv1oODUX-HlI1CPbpO5UQ`

> ⚠️ 使用前必須將 Sheet 設定為「知道連結的人可以**檢視**」

### 工作表頁籤名稱（含關鍵字即可，大小寫不限）

| 模組 | 關鍵字 | 欄位（A→） |
|---|---|---|
| 📦 庫存 | `inventory` | name, category, quantity, unit, threshold, imageUrl, barcode, location, note |
| 👗 衣櫥 | `wardrobe` | name, type, size, sleeve, source, status, location, worn, note, imageUrl |
| 📋 提醒 | `reminder` | title, type, recurrence, dueDate, amount, description |
| 📖 百科 | `wiki` | title, category, tags, url, imageUrl, note |

**tags** 多個標籤以空格分隔；**worn** 值為 `true` / `false`；**dueDate** 格式 `YYYY-MM-DD`

### category 可用值

```
庫存: food drink frozen clean bath medical baby kitchen office other
衣櫥 type: 上衣 洋裝/連身 裙子/褲子 套裝 外套 居家 配件 其他
提醒 type: financial subscription consumable chore health other
提醒 recurrence: once daily weekly biweekly monthly bimonthly quarterly semiannual yearly
百科: recipe health baby home finance travel tool memo other
```

---

## 🚀 部署

1. 上傳所有 `.html` 檔到 `yui0151/home-hub` repo
2. Settings → Pages → Source：`main` / `root`
3. 約 1 分鐘後訪問 `https://yui0151.github.io/home-hub/`
4. 輸入家庭房間碼登入

---

## ⚠️ 開發守則（避免踩坑）

| 規則 | 原因 |
|---|---|
| Favicon 用 🌙 emoji SVG，絕不用 base64 | 101KB base64 會讓 Babel 解析崩潰 |
| JS 字串用 `\n` 跳脫，絕不含真實換行 | 單引號字串含真實換行讓 Babel 崩潰 |
| storageBucket 用 `.firebasestorage.app` | `.appspot.com` 已棄用 |
| GSheet 錯誤訊息顯示偵測到的工作表名稱 | 方便 debug 頁籤名稱不符的問題 |

---

*嘟嘟一家 🌙 · Home Hub v3.1 · 2026*
