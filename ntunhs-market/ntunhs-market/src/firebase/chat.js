// src/firebase/chat.js
// 即時聊天（私聊 + 群聊）使用 Firestore onSnapshot 即時監聽

import {
  collection, addDoc, query, orderBy, onSnapshot,
  serverTimestamp, doc, getDoc, setDoc, getDocs,
  where, limit,
} from 'firebase/firestore';
import { db } from './config';

// ════════════════════════════════
// 群組聊天室
// ════════════════════════════════

// 傳送群組訊息
export async function sendGroupMessage({ text, senderName, senderUid, senderColor }) {
  await addDoc(collection(db, 'groupChat'), {
    text,
    senderName,
    senderUid,
    senderColor: senderColor || '#0ea5e9',
    createdAt: serverTimestamp(),
  });
}

// 即時監聽群組訊息（回傳 unsubscribe function）
export function listenGroupMessages(callback) {
  const q = query(collection(db, 'groupChat'), orderBy('createdAt', 'asc'), limit(100));
  return onSnapshot(q, snap => {
    const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
}

// ════════════════════════════════
// 私人聊天室
// ════════════════════════════════

// 產生唯一聊天室 ID（用兩個 uid 排序組合，確保同一對話唯一）
export function getChatRoomId(uid1, uid2) {
  return [uid1, uid2].sort().join('_');
}

// 取得或建立聊天室
export async function getOrCreateChatRoom(myUid, otherUid, otherName) {
  const roomId = getChatRoomId(myUid, otherUid);
  const roomRef = doc(db, 'chatRooms', roomId);
  const snap = await getDoc(roomRef);
  if (!snap.exists()) {
    await setDoc(roomRef, {
      members: [myUid, otherUid],
      memberNames: { [otherUid]: otherName },
      lastMessage: '',
      lastMessageAt: serverTimestamp(),
      unread: { [myUid]: 0, [otherUid]: 0 },
    });
  }
  return roomId;
}

// 傳送私人訊息
export async function sendPrivateMessage(roomId, { text, senderUid, senderName }) {
  // 新增訊息
  await addDoc(collection(db, 'chatRooms', roomId, 'messages'), {
    text,
    senderUid,
    senderName,
    createdAt: serverTimestamp(),
  });

  // 更新聊天室最後訊息
  const roomRef = doc(db, 'chatRooms', roomId);
  const roomSnap = await getDoc(roomRef);
  if (roomSnap.exists()) {
    const data = roomSnap.data();
    const otherUid = data.members.find(m => m !== senderUid);
    await setDoc(roomRef, {
      ...data,
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
      unread: {
        ...data.unread,
        [otherUid]: (data.unread[otherUid] || 0) + 1,
      },
    });
  }
}

// 即時監聽私人訊息
export function listenPrivateMessages(roomId, callback) {
  const q = query(
    collection(db, 'chatRooms', roomId, 'messages'),
    orderBy('createdAt', 'asc'),
    limit(200)
  );
  return onSnapshot(q, snap => {
    const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
}

// 取得使用者所有聊天室清單
export function listenChatRooms(uid, callback) {
  const q = query(collection(db, 'chatRooms'), where('members', 'array-contains', uid));
  return onSnapshot(q, snap => {
    const rooms = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    rooms.sort((a, b) => {
      const ta = a.lastMessageAt?.seconds || 0;
      const tb = b.lastMessageAt?.seconds || 0;
      return tb - ta;
    });
    callback(rooms);
  });
}

// 標記已讀（清除未讀數）
export async function markAsRead(roomId, uid) {
  const roomRef = doc(db, 'chatRooms', roomId);
  const snap = await getDoc(roomRef);
  if (snap.exists()) {
    const data = snap.data();
    await setDoc(roomRef, {
      ...data,
      unread: { ...data.unread, [uid]: 0 },
    });
  }
}
