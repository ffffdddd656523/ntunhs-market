import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addProduct } from '../firebase/products';
import { addJob, addCourse } from '../firebase/posts';
import { UploadIcon, XIcon } from '../components/Icons';

export default function CreatePostPage({ setPage }) {
  const { user, profile, isLoggedIn } = useAuth();
  const [form, setForm] = useState({ type: 'product', title: '', category: '', price: '', description: '', contact: '', location: '', salary: '', hours: '', courseName: '', currentTime: '', desiredTime: '', reason: '' });
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleImg = e => {
    const f = e.target.files && e.target.files[0];
    if (f) { setImgFile(f); const r = new FileReader(); r.onloadend = () => setImgPreview(r.result); r.readAsDataURL(f); }
  };

  const handleSubmit = async e => {
    e.preventDefault(); setErr(''); setLoading(true);
    try {
      const sellerName = profile ? profile.name : (user.displayName || '匿名');
      const sellerDept = profile ? profile.department : '護理系';
      if (form.type === 'product') {
        await addProduct({ title: form.title, category: form.category, price: form.price, description: form.description, contact: form.contact, seller: sellerName, dept: sellerDept, sellerUid: user.uid, imageFile: imgFile });
      } else if (form.type === 'job') {
        await addJob({ title: form.title, type: form.category, location: form.location, salary: form.salary, hours: form.hours, description: form.description, contact: form.contact, poster: sellerName, posterUid: user.uid });
      } else {
        await addCourse({ title: form.title, type: form.category, courseName: form.courseName, currentTime: form.currentTime, desiredTime: form.desiredTime, reason: form.reason, contact: form.contact, poster: sellerName, department: sellerDept, posterUid: user.uid });
      }
      setSubmitted(true);
    } catch (error) { setErr('發布失敗：' + error.message); }
    finally { setLoading(false); }
  };

  const reset = () => { setForm({ type: 'product', title: '', category: '', price: '', description: '', contact: '', location: '', salary: '', hours: '', courseName: '', currentTime: '', desiredTime: '', reason: '' }); setImgFile(null); setImgPreview(null); setSubmitted(false); setErr(''); };

  if (!isLoggedIn) return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 10 }}>請先登入</h2>
      <p style={{ color: '#64748b', marginBottom: 24 }}>發布貼文需要登入帳號</p>
      <button onClick={() => setPage('login')} style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', border: 'none', padding: '13px 32px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 16, fontFamily: 'inherit' }}>立即登入</button>
    </div>
  );

  if (submitted) return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 10 }}>貼文發布成功！</h2>
      <p style={{ color: '#64748b', marginBottom: 24 }}>已儲存到 Firestore 資料庫！</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={() => setPage('products')} style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>瀏覽商品</button>
        <button onClick={reset} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '12px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>再發一篇</button>
      </div>
    </div>
  );

  const catOptions = form.type === 'product' ? ['書籍', '彩妝', '衣服', '生活用品'] : form.type === 'job' ? ['校內工讀', '校外兼職', '實習機會'] : ['必修課程', '選修課程'];
  const inp = { width: '100%', padding: '11px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 6 }}>發布貼文</h1>
      <p style={{ color: '#64748b', marginBottom: 28 }}>資料將儲存到 Firebase Firestore</p>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', boxShadow: '0 2px 14px rgba(0,0,0,.07)' }}>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>貼文類型 *</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[['product','商品販售'],['job','打工資訊'],['course','換課資訊']].map(([v,l])=>(
              <button type="button" key={v} onClick={()=>setForm({...form,type:v,category:''})} style={{ padding:'12px 0',borderRadius:10,border:`2px solid ${form.type===v?'#0ea5e9':'#e2e8f0'}`,background:form.type===v?'#e0f2fe':'#fff',color:form.type===v?'#0284c7':'#475569',fontWeight:600,cursor:'pointer',fontSize:14,fontFamily:'inherit' }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:18}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>標題 *</label><input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="請輸入標題" style={inp}/></div>
        <div style={{marginBottom:18}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>類別 *</label>
          <select required value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={inp}><option value="">請選擇類別</option>{catOptions.map(o=><option key={o} value={o}>{o}</option>)}</select>
        </div>
        {form.type==='product'&&<>
          <div style={{marginBottom:18}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>價格 (NT$) *</label><input required type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="請輸入價格" style={inp}/></div>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>商品圖片</label>
            {imgPreview?(<div style={{position:'relative'}}><img src={imgPreview} alt="preview" style={{width:'100%',height:200,objectFit:'cover',borderRadius:10}}/><button type="button" onClick={()=>{setImgFile(null);setImgPreview(null);}} style={{position:'absolute',top:10,right:10,width:30,height:30,borderRadius:'50%',background:'#ef4444',border:'none',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><XIcon/></button></div>)
            :(<label style={{display:'block',border:'2px dashed #e2e8f0',borderRadius:12,padding:'32px',textAlign:'center',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#0ea5e9'} onMouseLeave={e=>e.currentTarget.style.borderColor='#e2e8f0'}><input type="file" accept="image/*" onChange={handleImg} style={{display:'none'}}/><div style={{color:'#94a3b8',margin:'0 auto 8px',width:40,height:40}}><UploadIcon/></div><p style={{color:'#64748b',fontSize:14}}>點擊上傳（存至 Firebase Storage）</p></label>)}
          </div>
        </>}
        {form.type==='job'&&<>
          <div style={{marginBottom:18}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>工作地點 *</label><input required value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="例如：石牌捷運站" style={inp}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:18}}>
            <div><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>薪資 *</label><input required value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} placeholder="時薪 NT$ 190" style={inp}/></div>
            <div><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>工時 *</label><input required value={form.hours} onChange={e=>setForm({...form,hours:e.target.value})} placeholder="彈性排班" style={inp}/></div>
          </div>
        </>}
        {form.type==='course'&&<>
          <div style={{marginBottom:18}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>課程名稱 *</label><input required value={form.courseName} onChange={e=>setForm({...form,courseName:e.target.value})} placeholder="例如：解剖學" style={inp}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:18}}>
            <div><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>目前時段 *</label><input required value={form.currentTime} onChange={e=>setForm({...form,currentTime:e.target.value})} placeholder="週三 13:10-15:00" style={inp}/></div>
            <div><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>希望換到 *</label><input required value={form.desiredTime} onChange={e=>setForm({...form,desiredTime:e.target.value})} placeholder="週五 13:10-15:00" style={inp}/></div>
          </div>
          <div style={{marginBottom:18}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>換課原因 *</label><input required value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} placeholder="請說明換課原因" style={inp}/></div>
        </>}
        <div style={{marginBottom:18}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>詳細描述 *</label><textarea required value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="請詳細描述..." rows={4} style={{...inp,resize:'vertical'}}/></div>
        <div style={{marginBottom:24}}><label style={{fontSize:14,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>聯絡方式 *</label><input required value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} placeholder="Line ID、手機號碼" style={inp}/></div>
        {err&&<div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'10px 14px',marginBottom:16,fontSize:13,color:'#dc2626'}}>{err}</div>}
        <div style={{display:'flex',gap:12}}>
          <button type="submit" disabled={loading} style={{flex:1,background:loading?'#94a3b8':'linear-gradient(135deg,#0ea5e9,#0284c7)',color:'#fff',border:'none',padding:'13px 0',borderRadius:12,fontWeight:700,fontSize:15,cursor:loading?'not-allowed':'pointer',fontFamily:'inherit'}}>{loading?'發布中...':'發布貼文'}</button>
          <button type="button" onClick={reset} style={{padding:'13px 24px',borderRadius:12,border:'1.5px solid #e2e8f0',background:'#fff',color:'#475569',cursor:'pointer',fontWeight:600,fontFamily:'inherit'}}>重設</button>
        </div>
      </form>
    </div>
  );
}
