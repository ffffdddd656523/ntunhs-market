// src/firebase/auth.js
// 登入、註冊、登出相關函式

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// 註冊
export async function register({ name, studentId, email, password, department }) {
  // 建立 Firebase Auth 帳號
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  // 更新顯示名稱
  await updateProfile(user, { displayName: name });

  // 把使用者資料存入 Firestore users 集合
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    studentId,
    email,
    department: department || '護理系',
    createdAt: serverTimestamp(),
  });

  return user;
}

// 登入
export async function login(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

// 登出
export async function logout() {
  await signOut(auth);
}

// 取得使用者資料（從 Firestore）
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) return snap.data();
  return null;
}
