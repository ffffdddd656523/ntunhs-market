// src/pages/AuthPages.jsx - Firebase Auth version
import { useState } from 'react';
import { LogInIcon } from '../components/Icons';
import { login, register } from '../firebase/auth';

export function LoginPage({ setPage }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      setPage('home');
    } catch (error) {
      const msg = {
        'auth/user-not-found': '找不到此帳號，請確認信箱是否正確',
        'auth/wrong-password': '密碼錯誤，請重新輸入',
        'auth/invalid-email': '信箱格式不正確',
        'auth/too-many-requests': '登入失敗次數過多，請稍後再試',
        'auth/invalid-credential': '帳號或密碼錯誤',
      };
      setErr(msg[error.code] || '登入失敗：' + error.message);
    } finally {
      setLoading(false);
    }
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
            <LogInIcon /><h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: 0 }}>登入帳號</h2>
          </div>
          <form onSubmit={submit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>學校信箱 *</label>
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="student@ntunhs.edu.tw" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>密碼 *</label>
              <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="請輸入密碼" style={inputStyle} />
            </div>
            {err && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>{err}</div>}
            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#94a3b8' : 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', border: 'none', padding: '13px 0', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 14, fontFamily: 'inherit' }}>
              {loading ? '登入中...' : '登入'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
              還沒有帳號？<button type="button" onClick={() => setPage('register')} style={{ border: 'none', background: 'none', color: '#0ea5e9', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>立即註冊</button>
            </p>
          </form>
        </div>
        <div style={{ marginTop: 16, background: '#dbeafe', borderRadius: 10, padding: '12px 16px', textAlign: 'center', fontSize: 13, color: '#1d4ed8', lineHeight: 1.7 }}>
          本平台僅限北護大學學生使用<br />請使用學校信箱進行註冊
        </div>
      </div>
    </div>
  );
}

export function RegisterPage({ setPage }) {
  const [form, setForm] = useState({ name: '', studentId: '', email: '', department: '護理系', password: '', confirm: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setErr('');
    if (form.password !== form.confirm) { setErr('密碼不一致，請重新確認！'); return; }
    if (form.password.length < 6) { setErr('密碼至少需要 6 個字元'); return; }
    setLoading(true);
    try {
      await register({ name: form.name, studentId: form.studentId, email: form.email, password: form.password, department: form.department });
      setPage('home');
    } catch (error) {
      const msg = { 'auth/email-already-in-use': '此信箱已被註冊，請直接登入', 'auth/invalid-email': '信箱格式不正確', 'auth/weak-password': '密碼強度不足，至少需要6個字元' };
      setErr(msg[error.code] || '註冊失敗：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };

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
            {[{key:'name',label:'姓名',type:'text',ph:'請輸入真實姓名'},{key:'studentId',label:'學號',type:'text',ph:'例如：11012345'},{key:'email',label:'學校信箱',type:'email',ph:'student@ntunhs.edu.tw'}].map(f=>(
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.label} *</label>
                <input required type={f.type} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.ph} style={inputStyle}/>
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>系所 *</label>
              <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})} style={inputStyle}>
                {['護理系','公衛系','長照系','醫管系','語聽系','視光系','資管系'].map(d=><option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            {[{key:'password',label:'密碼（至少6碼）',ph:'請輸入密碼'},{key:'confirm',label:'確認密碼',ph:'請再次輸入密碼'}].map(f=>(
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.label} *</label>
                <input required type="password" value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.ph} style={inputStyle}/>
              </div>
            ))}
            {err && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#dc2626' }}>{err}</div>}
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 20, cursor: 'pointer', fontSize: 13, color: '#475569' }}>
              <input type="checkbox" required style={{ marginTop: 2 }}/>我同意使用條款，並確認為北護大學在學學生
            </label>
            <button type="submit" disabled={loading} style={{ width: '100%', background: loading?'#94a3b8':'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', border: 'none', padding: '13px 0', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: loading?'not-allowed':'pointer', marginBottom: 14, fontFamily: 'inherit' }}>
              {loading ? '註冊中...' : '註冊'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
              已有帳號？<button type="button" onClick={()=>setPage('login')} style={{ border: 'none', background: 'none', color: '#0ea5e9', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>立即登入</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
