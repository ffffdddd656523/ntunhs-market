# 🔥 Firebase 設定教學

## 第一步：建立 Firebase 專案

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 點選「新增專案」
3. 輸入專案名稱：`ntunhs-market`
4. 關閉 Google Analytics（作業用不需要）→ 建立專案

---

## 第二步：啟用 Authentication

1. 左側選單 → **Authentication** → 開始使用
2. 選「Sign-in method」頁籤
3. 啟用 **電子郵件/密碼**

---

## 第三步：建立 Firestore 資料庫

1. 左側選單 → **Firestore Database** → 建立資料庫
2. 選「**以測試模式啟動**」（作業期間用）
3. 選擇區域：`asia-east1`（台灣最近）→ 啟用

---

## 第四步：啟用 Storage（商品圖片）

1. 左側選單 → **Storage** → 開始使用
2. 選「以測試模式啟動」→ 完成

---

## 第五步：取得 Firebase 金鑰

1. 左側齒輪 → **專案設定**
2. 往下捲到「您的應用程式」→ 點 `</>` (Web)
3. 輸入應用程式名稱 → 註冊應用程式
4. 複製 `firebaseConfig` 的內容

---

## 第六步：設定本機環境變數

1. 複製根目錄的 `.env.example` → 重新命名為 `.env.local`
2. 填入你複製的 Firebase 設定值：

```
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=ntunhs-market.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=ntunhs-market
REACT_APP_FIREBASE_STORAGE_BUCKET=ntunhs-market.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

> ⚠️ `.env.local` 已在 `.gitignore` 中，不會被 push 到 GitHub（保護金鑰安全）

---

## 第七步：安裝並啟動

```bash
npm install
npm start
```

---

## Firestore 資料結構

```
Firestore
├── users/               ← 使用者資料
│   └── {uid}/
│       ├── name
│       ├── studentId
│       ├── email
│       ├── department
│       └── favorites/   ← 收藏商品
│           └── {productId}/
│
├── products/            ← 商品列表
│   └── {docId}/
│       ├── title, category, price
│       ├── description, contact
│       ├── seller, dept, sellerUid
│       ├── image (Storage URL)
│       ├── status (active/sold/inactive)
│       └── createdAt
│
├── jobs/                ← 打工資訊
│   └── {docId}/
│       ├── title, type, location
│       ├── salary, hours
│       ├── description, contact
│       └── createdAt
│
├── courses/             ← 換課資訊
│   └── {docId}/
│       ├── title, type, courseName
│       ├── currentTime, desiredTime
│       ├── reason, contact
│       └── createdAt
│
├── groupChat/           ← 北護大群訊息
│   └── {docId}/
│       ├── text, senderName, senderUid
│       └── createdAt
│
└── chatRooms/           ← 私人聊天室
    └── {uid1_uid2}/
        ├── members, lastMessage
        └── messages/
            └── {docId}/
                ├── text, senderUid, senderName
                └── createdAt
```

---

## Firestore 安全規則（測試完成後設定）

到 Firestore → 規則，貼上以下內容：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 已登入的使用者可以讀取所有商品
    match /products/{doc} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.sellerUid;
    }
    match /jobs/{doc} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.posterUid;
    }
    match /courses/{doc} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.posterUid;
    }
    match /groupChat/{doc} {
      allow read, create: if request.auth != null;
    }
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /chatRooms/{room} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.members;
      match /messages/{msg} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```
