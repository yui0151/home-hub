# 🌙 嘟嘟一家 · 家庭數位管家

> 一套專為家庭打造的輕量化 Web App，免安裝，手機即用，全家即時同步。

**🔗 線上使用：** https://yui0151.github.io/home-hub/
**📊 Google Sheet 模板：** https://docs.google.com/spreadsheets/d/1U5eIIBD9B5z8yDfNOCBGjHYv1oODUX-HlI1CPbpO5UQ/edit

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
- 即時天氣 + 穿衣建議（Open-Meteo，免費無需 Key，自動定位）
- 四格統計卡（急件 / 低庫存 / 衣物數 / 書籤），點擊直接跳轉
- **快速記錄**：備忘錄（自動儲存）/ 待辦事項 / 待買清單，各 Tab 顯示未完成數量
- 急件提醒列表（3 天內到期）
- 本月費用彙總（顯示實際月份，已付顯示刪除線）
- 庫存不足清單（點擊跳到待買清單）
- 精選書籤區（同步小百科釘選書籤）

### 📋 提醒系統
- **6 種類型**：帳單費用 / 訂閱服務 / 消耗品 / 家務 / 健康醫療 / 其他
- **9 種週期**：單次 / 每天 / 每週 / 每兩週 / 每月 / 每兩月 / 每季 / 每半年 / 每年
- ✅ 完成後**自動計算下次日期**並新增下一筆提醒
- 完成時可輸入**本次實際金額**（帳單金額每期可能不同）
- 分組顯示（逾期 / 今天 / 7天內 / 其他 / 已完成），可展開收折
- 本月費用橫幅標注當月月份
- 詳情頁預設唯讀，按 ✏️ 才進入編輯
- **📊 Google Sheet 匯入**

### 📦 庫存管理
- 10 種分類，Accordion 分組（預設收折）
- 卡片 ⊞ / 列表 ☰ 切換，列表模式顯示存放位置
- 快速 ± 數量按鈕（不需進詳情）
- 品項照片網址（contain 完整顯示，無圖顯示分類 Emoji）
- **警告值邏輯**：`0` = 用完才提醒，`>0` = 低於閾值即標記
- **待買清單**：庫存不足自動帶入 + 自由填寫，打勾完成 / ✕ 刪除
- 詳情頁預設唯讀，按 ✏️ 才進入編輯
- **📊 Google Sheet 匯入**

### 👗 電子衣櫥
- 9 個欄位（名稱 / 類型 / 尺碼 / 袖長 / 來源 / 狀態 / 位置 / 已穿 / 備註）
- 卡片 ⊞ / 列表 ☰ 切換
- 照片欄位在最上方，新增時**即時預覽**照片（contain 完整顯示）
- 詳情頁**雙欄對稱排版**
- 四格統計（總計 / 當季 / 非當季 / 未穿）
- 📌 釘選最愛橫向捲動快速區
- 詳情頁預設唯讀，按 ✏️ 才進入編輯
- **📊 Google Sheet 匯入**

### 📖 小百科
- 貼網址自動抓取 OG 標題 + 封面圖（三層備援：jsonlink → microlink → allorigins）
- 無圖時自動顯示分類 Emoji，不留白
- 📌 釘選書籤同步首頁「精選書籤」區
- ⊞ 網格 / ☰ 列表切換（contain 完整顯示圖片）
- Markdown 筆記編輯器（含即時預覽）
- 9 種分類 + 標籤搜尋
- 詳情頁預設唯讀，按 ✏️ 才進入編輯
- **📊 Google Sheet 匯入**

---

## 🛠 技術架構

| 層 | 技術 |
|---|---|
| 前端框架 | React 18（CDN）+ Babel |
| 樣式 | 純 CSS Variables |
| 資料庫 | Firebase Firestore（compat SDK v9）|
| 離線支援 | `enablePersistence()` |
| 天氣 | Open-Meteo API（免費，無需金鑰）|
| OG 預覽 | jsonlink.io → microlink.io → allorigins |
| 字體 | Noto Serif TC + Zen Kaku Gothic New |
| 部署 | GitHub Pages |

**零依賴安裝。所有 CDN 透過 `<script>` 載入，直接上傳 HTML 即部署。**

---

## 🎨 設計系統

### 色彩

| 變數 | HEX | 用途 |
|---|---|---|
| `--paper` | `#FDFBFA` | 全域背景 |
| `--clay` | `#A68A7D` | 主色（按鈕、active 狀態）|
| `--sage` | `#8FA68B` | 成功、庫存充足 |
| `--wood` | `#4A423D` | 主要文字 |
| `--sand` | `#EAE2D6` | 邊框、分隔線 |
| `--highlight` | `#D99A84` | 警告、急件、待買清單 |
| `--card` | `#F9F7F4` | 卡片背景 |

### 字體
- **標題**：Noto Serif TC（400 / 500 / 700）
- **內文**：Zen Kaku Gothic New（300 / 400 / 500）

---

## 🗃 Firebase 資料結構

房間碼為隔離單位，不同家庭資料完全獨立。

```
reminders / {roomCode} / items
  title, type, recurrence, dueDate, amount, description
  status, completionHistory[], createdAt, updatedAt

inventory / {roomCode} / items
  name, category, quantity, unit, threshold
  imageUrl, barcode, location, note, createdAt, updatedAt

wardrobe / {roomCode} / items
  name, type, size, sleeve, source, status
  location, worn, note, imageUrl, pinned, createdAt, updatedAt

wiki / {roomCode} / articles
  title, category, tags[], url, imageUrl, note
  domain, og{}, pinned, createdAt, updatedAt
```

---

## 📊 Google Sheet 匯入格式

**Sheet ID：** `1U5eIIBD9B5z8yDfNOCBGjHYv1oODUX-HlI1CPbpO5UQ`

使用前請將 Sheet 設定為「知道連結的人可以**檢視**」。

### 工作表頁籤名稱對照

| 模組 | 頁籤名稱（含此字即可）| 支援直接匯入 |
|---|---|---|
| 📦 庫存 | `inventory` | ✅ |
| 👗 衣櫥 | `wardrobe` | ✅ |
| 📋 提醒 | `reminder` | ✅ |
| 📖 百科 | `wiki` | ✅ |

### 各模組欄位

**📦 庫存**（工作表：inventory）
```
name, category, quantity, unit, threshold, imageUrl, barcode, location, note
```
category 值：`food` `drink` `frozen` `clean` `bath` `medical` `baby` `kitchen` `office` `other`

**👗 衣櫥**（工作表：wardrobe）
```
name, type, size, sleeve, source, status, location, worn, note, imageUrl
```
type 值：`上衣` `洋裝/連身` `裙子/褲子` `套裝` `外套` `居家` `配件` `其他`
worn 值：`true` / `false`

**📋 提醒**（工作表：reminder）
```
title, type, recurrence, dueDate, amount, description
```
type 值：`financial` `subscription` `consumable` `chore` `health` `other`
recurrence 值：`once` `daily` `weekly` `biweekly` `monthly` `bimonthly` `quarterly` `semiannual` `yearly`

**📖 百科**（工作表：wiki）
```
title, category, tags, url, imageUrl, note
```
category 值：`recipe` `health` `baby` `home` `finance` `travel` `tool` `memo` `other`
tags：多個標籤以**空格**分隔

---

## 🚀 部署步驟

1. 將所有 `.html` 檔案上傳至 `yui0151/home-hub` repo
2. Settings → Pages → Source：`main` branch，folder：`/ (root)`
3. 約 1 分鐘後，訪問 `https://yui0151.github.io/home-hub/`
4. 輸入家庭房間碼（`MY0918`）登入

---

## 🔒 安全說明

- Firebase API Key 為前端公開設計（正常做法）
- 資料以**房間碼**隔離，不同家庭互不可見
- 如需更高安全性，可在 Firebase Console 設定 Firestore Rules 或加入 Authentication

---

## 📘 說明文件

| 文件 | 說明 |
|---|---|
| [`guide.html`](./guide.html) | 家人操作說明書（繁中，圖文並茂）|
| [`sheet-guide.html`](./sheet-guide.html) | Google Sheet 格式與匯入教學 |

---

*嘟嘟一家 🌙 · Home Hub v3.0 · 2026 · 以愛打造，為家庭服務*
