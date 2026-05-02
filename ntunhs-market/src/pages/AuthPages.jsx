import { useState } from 'react';
import { LogInIcon } from '../components/Icons';

export function LoginPage({ setPage, setIsLoggedIn }) {
  const [form, setForm] = useState({ studentId: '', password: '' });

  const submit = e => {
    e.preventDefault();
    setIsLoggedIn(true);
    setPage('home');
  };

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };

  return (
    <div style={{ minHeight: '60vh', background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <span style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>北</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>北護小物販賣網站</h1>
          <p style={{ color: '#64748b' }}>限北護學生使用</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,.09)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            <LogInIcon />
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: 0 }}>登入帳號</h2>
          </div>
          <form onSubmit={submit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>學號 *</label>
              <input required value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} placeholder="請輸入學號" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>密碼 *</label>
              <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="請輸入密碼" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer', fontSize: 13, color: '#475569' }}>
                <input type="checkbox" />記住我
              </label>
              <a href="#top" style={{ fontSize: 13, color: '#0ea5e9', textDecoration: 'none' }}>忘記密碼？</a>
            </div>
            <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', border: 'none', padding: '13px 0', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 14, fontFamily: 'inherit' }}>
              登入
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
              還沒有帳號？
              <button type="button" onClick={() => setPage('register')} style={{ border: 'none', background: 'none', color: '#0ea5e9', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>立即註冊</button>
            </p>
          </form>
        </div>

        <div style={{ marginTop: 16, background: '#dbeafe', borderRadius: 10, padding: '12px 16px', textAlign: 'center', fontSize: 13, color: '#1d4ed8', lineHeight: 1.7 }}>
          本平台僅限北護大學學生使用<br />請使用學號進行註冊
        </div>
      </div>
    </div>
  );
}

export function RegisterPage({ setPage, setIsLoggedIn }) {
  const [form, setForm] = useState({ name: '', studentId: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState('');

  const submit = e => {
    e.preventDefault();
    if (form.password !== form.confirm) { setErr('密碼不一致，請重新確認！'); return; }
    setIsLoggedIn(true);
    setPage('home');
  };

  const fields = [
    { key: 'name', label: '姓名', type: 'text' },
    { key: 'studentId', label: '學號', type: 'text' },
    { key: 'email', label: 'Email（學校信箱）', type: 'email' },
    { key: 'password', label: '密碼', type: 'password' },
    { key: 'confirm', label: '確認密碼', type: 'password' },
  ];

  return (
    <div style={{ minHeight: '60vh', background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <span style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>北</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>北護小物販賣網站</h1>
          <p style={{ color: '#64748b' }}>建立新帳號</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,.09)' }}>
          <form onSubmit={submit}>
            {fields.map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.label} *</label>
                <input
                  required type={f.type}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={`請輸入${f.label}`}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
            ))}
            {err && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{err}</p>}
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 20, cursor: 'pointer', fontSize: 13, color: '#475569' }}>
              <input type="checkbox" required style={{ marginTop: 2 }} />
              我同意使用條款與隱私政策，並確認為北護大學在學學生
            </label>
            <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', border: 'none', padding: '13px 0', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 14, fontFamily: 'inherit' }}>
              註冊
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
              已有帳號？
              <button type="button" onClick={() => setPage('login')} style={{ border: 'none', background: 'none', color: '#0ea5e9', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>立即登入</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
