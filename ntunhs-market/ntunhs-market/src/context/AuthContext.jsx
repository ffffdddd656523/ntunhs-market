// src/context/AuthContext.jsx
// 全域登入狀態管理，讓所有頁面都能取得目前使用者

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserProfile } from '../firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Firebase Auth user
  const [profile, setProfile] = useState(null); // Firestore user profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 監聽登入狀態變化
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const p = await getUserProfile(firebaseUser.uid);
        setProfile(p);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub; // cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook：在任何元件中使用 useAuth() 取得登入資訊
export function useAuth() {
  return useContext(AuthContext);
}
