# Minecraft Bedrock 伺服器入口

繁體中文靜態網站，保留深綠配色、伺服器卡片及備份文件入口。

## 伺服器

- `ser.4n.nz:19132`
- `rail.4n.nz:19132`

「開啟 Minecraft」使用 Bedrock 的新增伺服器連結，仍需在遊戲內確認加入。另提供複製位址按鈕。位址與連接埠可在 `servers.js` 修改。

備份文件按鈕連至 Google Drive，可在 Google Drive 中申請瀏覽權限。

## GitHub Pages

在儲存庫 **Settings → Pages** 中設定：

- Source：**Deploy from a branch**
- Branch：**main**
- Folder：**/ (root)**

儲存並等候部署完成。不需要安裝套件或執行建置。

## 檔案

- `index.html`：頁面與備份文件連結。
- `style.css`：色彩、卡片與響應式版面。
- `servers.js`：伺服器清單。
- `app.js`：開啟遊戲與複製位址功能。
- `.nojekyll`：讓 GitHub Pages 直接提供靜態檔案。
