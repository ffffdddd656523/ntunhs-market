# 北護小物販賣網站 🏥

臺北護理健康大學學生二手交易與資訊交流平台

## 功能特色

- 🛍️ **商品分類** — 書籍、彩妝、衣服、生活用品二手販售
- 💼 **打工資訊** — 校內工讀、校外兼職、實習機會
- 🔄 **換課資訊** — 課程時段交換需求公告
- ✍️ **發布貼文** — 支援商品、打工、換課三種類型
- 💬 **私人聊天室** — 與賣家直接溝通
- 👥 **北護大群** — 全校學生公開聊天室
- 🖼️ **以圖搜圖** — 上傳圖片搜尋相似商品
- ❤️ **商品典藏** — 收藏喜愛商品
- 👤 **會員中心** — 管理個人貼文與收藏

---

## 安裝與執行

### 環境需求

- **Node.js** 16 以上（建議 18 LTS）
- **npm** 8 以上

### 步驟

```bash
# 1. Clone 專案
git clone https://github.com/<你的帳號>/ntunhs-market.git
cd ntunhs-market

# 2. 安裝依賴套件
npm install

# 3. 啟動開發伺服器
npm start
```

瀏覽器會自動開啟 [http://localhost:3000](http://localhost:3000)

---

## 打包部署

```bash
# 建立正式版本（輸出到 /build 資料夾）
npm run build
```

---

## 專案結構

```
ntunhs-market/
├── public/
│   └── index.html          # HTML 入口
├── src/
│   ├── components/
│   │   ├── Icons.jsx        # SVG 圖示元件
│   │   ├── Common.jsx       # 共用元件（Avatar, Badge, ProductCard）
│   │   ├── Navbar.jsx       # 導覽列
│   │   └── Footer.jsx       # 頁尾
│   ├── pages/
│   │   ├── HomePage.jsx         # 首頁
│   │   ├── ProductListPage.jsx  # 商品列表
│   │   ├── ProductDetailPage.jsx# 商品詳情
│   │   ├── JobListPage.jsx      # 打工資訊
│   │   ├── CourseListPage.jsx   # 換課資訊
│   │   ├── CreatePostPage.jsx   # 發布貼文
│   │   ├── ChatPage.jsx         # 私人聊天室
│   │   ├── GroupChatPage.jsx    # 群組聊天室
│   │   ├── VisualSearchPage.jsx # 以圖搜圖
│   │   ├── ProfilePage.jsx      # 會員中心
│   │   └── AuthPages.jsx        # 登入 / 註冊
│   ├── data.js             # 模擬資料
│   ├── App.jsx             # 主程式 / 路由
│   ├── index.js            # React 入口
│   └── index.css           # 全域樣式
├── package.json
└── README.md
```

---

## 測試登入

目前為 Demo 版本，輸入任意學號與密碼即可登入。

---

## 技術棧

- **React 18** — 前端框架
- **Create React App** — 專案建構工具
- **Inline Styles** — 元件化樣式（無需額外 CSS 框架）
- **Unsplash** — 示範商品圖片

---

## 組員分工建議

| 功能模組 | 說明 |
|---------|------|
| `HomePage.jsx` | 首頁設計、搜尋列 |
| `ProductListPage / ProductDetailPage` | 商品功能 |
| `JobListPage / CourseListPage` | 資訊板塊 |
| `ChatPage / GroupChatPage` | 聊天功能 |
| `AuthPages / ProfilePage` | 會員系統 |
| `data.js` | 串接後端 API（未來擴充） |

---

© 2026 北護小物販賣網站
