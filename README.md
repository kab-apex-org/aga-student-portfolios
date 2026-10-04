# AI 原生學院學生作品集

這是可直接放在 GitHub Pages 的靜態網站。首頁列出各班級，只有「AI 體驗課」開放共用帳密登入；登入後可選擇 2026 年 10 月 4 日的 BDG 與 F1 班。目前共有 15 件互動式電子寵物作品：BDG 7 件、F1 8 件。

## 更新作品

1. 把學生的 HTML 網頁放進 `works/`，並把作品縮圖存成 `assets/thumbs/作品代號.png`。
2. 安裝 Pillow，執行 `python3 scripts/optimize_works.py`。這會把 HTML 內的大型圖片拆成 `works/assets/` 的檔案、壓縮成 WebP，並產生較小的縮圖。轉換後請檢查角色圖片和互動按鈕。
3. 在 `app.js` 的 `WORKS` 物件新增名字、作品名稱、`classId` 及檔案路徑；班級作品清單會自動產生。
4. 發布時更新 `app.js` 的 `ASSET_VERSION` 和 `index.html` 的 `app.js` 網址版本，讓手機取得新檔案。

學生作品以 iframe 隔離呈現。Cynthia 的原稿在計時器函式中有四處多餘的花括號，已修正，互動功能才可執行。

## 存取範圍

此站沒有資料庫或會員系統。體驗課登入只是前端辨識；GitHub Pages 上的 HTML、圖片和學生作品檔案仍可透過直接網址讀取。若未來需要真正限制家長或班級的存取，應改用伺服器端驗證與受控檔案儲存。
