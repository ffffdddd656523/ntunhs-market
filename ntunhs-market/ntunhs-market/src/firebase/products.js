// src/firebase/products.js
// 商品的 新增 / 讀取 / 刪除 / 收藏

import {
  collection, addDoc, getDocs, getDoc, doc,
  deleteDoc, updateDoc, query, orderBy, where,
  serverTimestamp, setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

const COL = 'products';

// ── 讀取所有商品 ──────────────────────────────────────
export async function getProducts(category = null) {
  let q;
  if (category && category !== 'all') {
    q = query(collection(db, COL), where('category', '==', category), orderBy('createdAt', 'desc'));
  } else {
    q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── 讀取單一商品 ──────────────────────────────────────
export async function getProduct(id) {
  const snap = await getDoc(doc(db, COL, id));
  if (snap.exists()) return { id: snap.id, ...snap.data() };
  return null;
}

// ── 取得某使用者的商品 ────────────────────────────────
export async function getUserProducts(uid) {
  const q = query(collection(db, COL), where('sellerUid', '==', uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── 新增商品 ──────────────────────────────────────────
export async function addProduct({ title, category, price, description, contact, seller, dept, sellerUid, imageFile }) {
  let imageUrl = '';

  // 若有上傳圖片，先傳到 Firebase Storage
  if (imageFile) {
    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  const docRef = await addDoc(collection(db, COL), {
    title,
    category,
    price: Number(price),
    description,
    contact,
    seller,
    dept,
    sellerUid,
    image: imageUrl || 'https://images.unsplash.com/photo-1588912914017-923900a34710?w=600',
    status: 'active',   // active | sold | inactive
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// ── 更新商品狀態 ──────────────────────────────────────
export async function updateProductStatus(id, status) {
  await updateDoc(doc(db, COL, id), { status });
}

// ── 刪除商品 ──────────────────────────────────────────
export async function deleteProduct(id) {
  await deleteDoc(doc(db, COL, id));
}

// ── 收藏 / 取消收藏 ───────────────────────────────────
export async function toggleFavorite(uid, productId) {
  const favRef = doc(db, 'users', uid, 'favorites', productId);
  const snap = await getDoc(favRef);
  if (snap.exists()) {
    await deleteDoc(favRef);
    return false; // 取消收藏
  } else {
    await setDoc(favRef, { productId, addedAt: serverTimestamp() });
    return true;  // 加入收藏
  }
}

// ── 取得使用者收藏清單 ────────────────────────────────
export async function getFavorites(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'favorites'));
  return snap.docs.map(d => d.data().productId);
}
