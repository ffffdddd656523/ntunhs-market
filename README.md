# 北護小物販賣網站 🏥

臺北護理健康大學學生二手交易與資訊交流平台

## 快速開始

```bash
npm install   # 安裝套件（只需第一次）
npm start     # 啟動開發伺服器 → http://localhost:3000
npm run build # 打包正式版
```

**環境需求**：Node.js 16+

## 功能清單

| 功能 | 說明 |
|------|------|
| 商品分類 | 書籍、彩妝、衣服、生活用品，支援篩選與搜尋 |
| 打工資訊 | 校內工讀、校外兼職、實習機會 |
| 換課資訊 | 課程時段交換需求公告 |
| 發布貼文 | 三種類型，含圖片上傳 Modal（旋轉/縮放） |
| 私人聊天室 | 賣家一對一私訊 |
| 北護大群 | 全校學生公開聊天室 |
| 以圖搜圖 | 上傳圖片搜尋相似商品 |
| 會員中心 | 管理貼文、典藏商品、更換大頭照 |
| 📋 成果報表 | 專題評審展示報表（含展示步驟） |

## 科系列表（已更新為正確北護科系）

- **護理學院**：護理系、護理助產及婦女健康系、醫護教育暨數位學習系、高齡健康照護系
- **健康科技學院**：健康事業管理系、資訊管理系、長期照護系、休閒產業與健康促進系、語言治療與聽力學系
- **人類發展與健康學院**：嬰幼兒保育系、運動保健系、生死與健康心理諮商系

## 專案結構

```
src/
├── constants.js          ← 科系列表、類別常數
├── data.js               ← 示範資料
├── App.jsx               ← 路由主程式
├── components/
│   ├── Icons.jsx          ← SVG 圖示
│   ├── Common.jsx         ← 共用元件（Avatar、Badge、ProductCard）
│   ├── Navbar.jsx         ← 導覽列
│   ├── Footer.jsx         ← 頁尾
│   └── ImageUploadModal.jsx ← 圖片上傳 Modal（旋轉/縮放）
└── pages/
    ├── HomePage.jsx
    ├── ProductListPage.jsx
    ├── ProductDetailPage.jsx
    ├── JobListPage.jsx
    ├── CourseListPage.jsx
    ├── CreatePostPage.jsx
    ├── ChatPage.jsx
    ├── GroupChatPage.jsx
    ├── VisualSearchPage.jsx
    ├── ProfilePage.jsx
    ├── AuthPages.jsx       ← 登入 + 註冊
    └── PresentationPage.jsx ← 成果報表
```

## 修改組員資料

開啟 `src/pages/PresentationPage.jsx`，編輯頂端的 `TEAM_MEMBERS` 陣列即可。

---
© 2026 北護小物販賣網站
