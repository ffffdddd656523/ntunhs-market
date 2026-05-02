import { useState } from 'react';
import { UserIcon, LogInIcon, MenuIcon, XIcon } from './Icons';

export default function Navbar({ page, setPage, isLoggedIn, setIsLoggedIn }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: 'home', label: '首頁' },
    { id: 'products', label: '商品分類' },
    { id: 'jobs', label: '打工資訊' },
    { id: 'courses', label: '換課資訊' },
    { id: 'create', label: '發布貼文' },
    { id: 'group-chat', label: '北護大群' },
  ];

  const navBtnStyle = (active) => ({
    border: 'none', background: 'none', cursor: 'pointer',
    padding: '6px 10px', borderRadius: 8,
    color: active ? '#0ea5e9' : '#475569',
    fontWeight: active ? 700 : 500,
    fontSize: 13, transition: 'all .15s',
    fontFamily: 'inherit',
  });

  return (
    <nav style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,.06)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64,
      }}>
        {/* Logo */}
        <button onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'none', cursor: 'pointer' }}>
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>北</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>北護小物販賣</span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(l => (
            <button key={l.id} style={navBtnStyle(page === l.id)} onClick={() => { setPage(l.id); setMobileOpen(false); }}>
              {l.label}
            </button>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => setPage('profile')}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, border: 'none',
                background: page === 'profile' ? '#e0f2fe' : 'none',
                color: '#0ea5e9', cursor: 'pointer', padding: '6px 12px',
                borderRadius: 8, fontWeight: 600, fontSize: 13, fontFamily: 'inherit',
              }}
            >
              <UserIcon />會員中心
            </button>
          ) : (
            <button
              onClick={() => setPage('login')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#0ea5e9', color: '#fff', border: 'none',
                cursor: 'pointer', padding: '8px 16px', borderRadius: 8,
                fontWeight: 600, fontSize: 13, fontFamily: 'inherit',
              }}
            >
              <LogInIcon />登入
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          style={{ display: 'none', border: 'none', background: 'none', cursor: 'pointer', padding: 8 }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '8px 20px 16px' }}>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setMobileOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                border: 'none', background: 'none', cursor: 'pointer',
                padding: '10px 0', color: page === l.id ? '#0ea5e9' : '#475569',
                fontWeight: 600, fontFamily: 'inherit', fontSize: 14,
              }}
            >
              {l.label}
            </button>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => { setPage('profile'); setMobileOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', padding: '10px 0', color: '#0ea5e9', fontWeight: 600, fontFamily: 'inherit' }}
            >
              會員中心
            </button>
          ) : (
            <button
              onClick={() => { setPage('login'); setMobileOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                border: 'none', background: 'linear-gradient(135deg,#0ea5e9,#0284c7)',
                color: '#fff', cursor: 'pointer', padding: '10px 16px',
                borderRadius: 8, fontWeight: 600, marginTop: 8, fontFamily: 'inherit',
              }}
            >
              登入
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
