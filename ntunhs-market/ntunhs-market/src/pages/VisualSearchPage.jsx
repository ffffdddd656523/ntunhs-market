import { useState } from 'react';
import { ProductCard } from '../components/Common';
import { ImageIcon, XIcon, SearchIcon } from '../components/Icons';

export default function VisualSearchPage({ products, favorites, toggleFav, showProduct }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);

  const handleImg = e => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      const r = new FileReader();
      r.onloadend = () => { setUploadedImage(r.result); setResults(null); };
      r.readAsDataURL(f);
    }
  };

  const doSearch = () => {
    setSearching(true);
    setTimeout(() => { setSearching(false); setResults(products.slice(0, 3)); }, 1500);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 6 }}>以圖搜圖</h1>
        <p style={{ color: '#64748b' }}>上傳圖片，快速找到相似商品</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 18, padding: 32, boxShadow: '0 2px 14px rgba(0,0,0,.07)', marginBottom: 28 }}>
        {!uploadedImage ? (
          <label
            style={{ display: 'block', border: '2px dashed #e2e8f0', borderRadius: 14, padding: '48px 32px', textAlign: 'center', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#0ea5e9'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            <input type="file" accept="image/*" onChange={handleImg} style={{ display: 'none' }} />
            <div style={{ color: '#94a3b8', width: 48, height: 48, margin: '0 auto 16px' }}><ImageIcon /></div>
            <p style={{ color: '#1e293b', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>點擊或拖曳圖片到這裡</p>
            <p style={{ color: '#94a3b8', fontSize: 13 }}>支援 JPG、PNG 格式</p>
          </label>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
              <img src={uploadedImage} alt="uploaded" style={{ maxHeight: 280, borderRadius: 12, objectFit: 'cover' }} />
              <button
                onClick={() => { setUploadedImage(null); setResults(null); }}
                style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <XIcon />
              </button>
            </div>
            <br />
            <button
              onClick={doSearch}
              disabled={searching}
              style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 12, fontWeight: 700, cursor: searching ? 'wait' : 'pointer', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}
            >
              {searching ? '搜尋中...' : '開始搜尋'}
            </button>
          </div>
        )}
      </div>

      {results && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>搜尋結果（{results.length} 件相似商品）</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 18 }}>
            {results.map(p => (
              <ProductCard key={p.id} product={p} onClick={showProduct} onFavorite={toggleFav} isFav={favorites.has(p.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
