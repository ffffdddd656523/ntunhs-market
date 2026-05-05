import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { logout } from '../firebase/auth';
import { Avatar, CategoryBadge } from '../components/Common';
import { UserIcon, MailIcon, EditIcon, Trash2Icon } from '../components/Icons';

export default function ProfilePage({ setPage, favorites, products }) {
  const { user, profile } = useAuth();
  const [tab, setTab] = useState('posts');

  const handleLogout = async () => {
    await logout();
    setPage('home');
  };

  const name = profile ? profile.name : (user ? user.displayName : '使用者');
  const email = user ? user.email : '';
  const studentId = profile ? profile.studentId : '';
  const department = profile ? profile.department : '';

  const myPosts = [
    { id: '1', title: '護理學原理 第八版', category: '書籍', price: 350, status: 'active', date: '2天前', views: 48 },
    { id: '2', title: '解剖學講義', category: '書籍', price: 250, status: 'sold', date: '1週前', views: 35 },
  ];
  const statusMap = {
    active: { label: '上架中', color: '#16a34a', bg: '#dcfce7' },
    sold: { label: '已售出', color: '#374151', bg: '#f3f4f6' },
    inactive: { label: '已下架', color: '#dc2626', bg: '#fee2e2' },
  };
  const favProducts = products.filter(p => favorites.has(p.id));

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 6 }}>會員中心</h1>
      <p style={{ color: '#64748b', marginBottom: 28 }}>管理您的個人資料與貼文</p>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: '#fff', borderRadius: 18, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,.07)', position: 'sticky', top: 84 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Avatar name={name} color="#0ea5e9" size={80} />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginTop: 12, marginBottom: 4 }}>{name}</h2>
            <p style={{ fontSize: 13, color: '#64748b' }}>{department}</p>
          </div>
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, fontSize: 13, color: '#475569', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {studentId && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><UserIcon />{studentId}</div>}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><MailIcon />{email}</div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', marginTop: 20, background: '#fee2e2', color: '#dc2626', border: 'none', padding: '11px 0', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>
            登出
          </button>
        </div>
        <div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#f8fafc', borderRadius: 12, padding: 4 }}>
            {[['posts', '我的貼文'], ['favorites', '典藏商品']].map(([v, l]) => (
              <button key={v} onClick={() => setTab(v)} style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, background: tab === v ? '#fff' : 'transparent', color: tab === v ? '#0ea5e9' : '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: 14, boxShadow: tab === v ? '0 2px 8px rgba(0,0,0,.06)' : undefined, fontFamily: 'inherit' }}>
                {l}
              </button>
            ))}
          </div>
          {tab === 'posts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {myPosts.map(p => {
                const s = statusMap[p.status];
                return (
                  <div key={p.id} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                        <CategoryBadge cat={p.category} />
                        <span style={{ padding: '2px 8px', borderRadius: 99, background: s.bg, color: s.color, fontSize: 12, fontWeight: 600 }}>{s.label}</span>
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>{p.title}</h3>
                      <div style={{ fontSize: 13, color: '#64748b' }}>NT$ {p.price} · {p.date} · 瀏覽 {p.views} 次</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', color: '#0ea5e9' }}><EditIcon /></button>
                      <button style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#dc2626' }}><Trash2Icon /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab === 'favorites' && (
            favProducts.length === 0
              ? <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}><div style={{ fontSize: 48, marginBottom: 12 }}>🤍</div><p>還沒有典藏商品</p></div>
              : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 14 }}>
                  {favProducts.map(p => (
                    <div key={p.id} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                      <div style={{ padding: '12px 14px' }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>{p.title}</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#0ea5e9' }}>NT$ {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
          )}
        </div>
      </div>
    </div>
  );
}
