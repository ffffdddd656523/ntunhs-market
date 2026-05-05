// src/firebase/posts.js
// 打工資訊、換課資訊的 新增 / 讀取 / 刪除

import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, orderBy, where, serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// ════════════════════════════════
// 打工資訊
// ════════════════════════════════

export async function getJobs(type = null) {
  let q;
  if (type && type !== 'all') {
    q = query(collection(db, 'jobs'), where('type', '==', type), orderBy('createdAt', 'desc'));
  } else {
    q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addJob({ title, type, location, salary, hours, description, contact, poster, posterUid }) {
  const docRef = await addDoc(collection(db, 'jobs'), {
    title, type, location, salary, hours,
    description, contact, poster, posterUid,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteJob(id) {
  await deleteDoc(doc(db, 'jobs', id));
}

// ════════════════════════════════
// 換課資訊
// ════════════════════════════════

export async function getCourses(type = null) {
  let q;
  if (type && type !== 'all') {
    q = query(collection(db, 'courses'), where('type', '==', type), orderBy('createdAt', 'desc'));
  } else {
    q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addCourse({ title, type, courseName, currentTime, desiredTime, reason, contact, poster, department, posterUid }) {
  const docRef = await addDoc(collection(db, 'courses'), {
    title, type, courseName, currentTime, desiredTime,
    reason, contact, poster, department, posterUid,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteCourse(id) {
  await deleteDoc(doc(db, 'courses', id));
}
