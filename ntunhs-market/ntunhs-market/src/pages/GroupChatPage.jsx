import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/Common';
import { SendIcon, UsersIcon } from '../components/Icons';
import { sendGroupMessage, listenGroupMessages } from '../firebase/chat';
import { GROUP_MSGS_INIT } from '../data';

export default function GroupChatPage() {
  const { user, profile, isLoggedIn } = useAuth();
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState('');
  const [useFirebase, setUseFirebase] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    let unsub;
    try {
      unsub = listenGroupMessages(data => {
        if (data.length === 0 && msgs.length === 0) {
          setMsgs(GROUP_MSGS_INIT.map(m => ({ ...m, id: m.id })));
        } else {
          setMsgs(data.map(m => ({
            id: m.id,
            sender: m.senderName,
            color: m.senderColor || '#0ea5e9',
            text: m.text,
            time: m.createdAt?.toDate ? m.createdAt.toDate().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }) : '剛剛',
            isMe: user && m.senderUid === user.uid,
          })));
        }
      });
    } catch (e) {
      setUseFirebase(false);
      setMsgs(GROUP_MSGS_INIT);
    }
    return () => unsub && unsub();
  }, [user]);

  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' }); }, [msgs.length]);

  const send = async e => {
    e.preventDefault();
    if (!msg.trim()) return;
    const text = msg;
    setMsg('');
    if (useFirebase && isLoggedIn) {
      try {
        const senderName = profile ? profile.name : (user.displayName || '匿名');
        await sendGroupMessage({ text, senderName, senderUid: user.uid, senderColor: '#0ea5e9' });
      } catch {
        setMsgs(m => [...m, { id: 'l' + Date.now(), sender: '我', color: '#0ea5e9', text, time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }), isMe: true }]);
      }
    } else {
      setMsgs(m => [...m, { id: 'l' + Date.now(), sender: '我', color: '#0ea5e9', text, time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }), isMe: true }]);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><UsersIcon /></div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', margin: 0 }}>北護學生大群</h1>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>全校學生公開聊天室 {useFirebase ? '🟢 即時同步' : '⚪ 本機模式'}</p>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 14px rgba(0,0,0,.07)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 520 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {msgs.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.isMe ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
              {!m.isMe && <Avatar name={m.sender} color={m.color} size={32} />}
              <div style={{ maxWidth: '60%' }}>
                {!m.isMe && <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, marginLeft: 4 }}>{m.sender}</div>}
                <div style={{ padding: '10px 14px', borderRadius: m.isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.isMe ? 'linear-gradient(135deg,#0ea5e9,#0284c7)' : '#f1f5f9', color: m.isMe ? '#fff' : '#1e293b', fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, textAlign: m.isMe ? 'right' : 'left' }}>{m.time}</div>
              </div>
              {m.isMe && <Avatar name={m.sender} color={m.color} size={32} />}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form onSubmit={send} style={{ padding: '14px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} placeholder={isLoggedIn ? '輸入訊息，與全校同學交流...' : '請先登入才能發送訊息'}
            disabled={!isLoggedIn}
            style={{ flex: 1, padding: '11px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit', background: isLoggedIn ? '#fff' : '#f8fafc' }} />
          <button type="submit" disabled={!isLoggedIn} style={{ background: isLoggedIn ? 'linear-gradient(135deg,#0ea5e9,#0284c7)' : '#e2e8f0', color: isLoggedIn ? '#fff' : '#94a3b8', border: 'none', padding: '0 20px', borderRadius: 10, cursor: isLoggedIn ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontFamily: 'inherit' }}>
            <SendIcon />傳送
          </button>
        </form>
      </div>
    </div>
  );
}
