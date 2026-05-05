import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import JobListPage from './pages/JobListPage';
import CourseListPage from './pages/CourseListPage';
import CreatePostPage from './pages/CreatePostPage';
import ChatPage from './pages/ChatPage';
import GroupChatPage from './pages/GroupChatPage';
import VisualSearchPage from './pages/VisualSearchPage';
import ProfilePage from './pages/ProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { PRODUCTS } from './data';

export default function App() {
  const { isLoggedIn, user, profile } = useAuth();
  const [page, setPage] = useState('home');
  const [products] = useState(PRODUCTS);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleFav = id => setFavorites(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const showProduct = product => { setSelectedProduct(product); setPage('product-detail'); };
  const goChat = () => { if (isLoggedIn) setPage('chat'); else setPage('login'); };
  const noLayout = page === 'login' || page === 'register';

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} products={products} favorites={favorites} toggleFav={toggleFav} showProduct={showProduct} />;
      case 'products': return <ProductListPage products={products} favorites={favorites} toggleFav={toggleFav} showProduct={showProduct} />;
      case 'product-detail': return <ProductDetailPage product={selectedProduct} favorites={favorites} toggleFav={toggleFav} setPage={setPage} onContact={goChat} />;
      case 'jobs': return <JobListPage />;
      case 'courses': return <CourseListPage />;
      case 'create': return <CreatePostPage setPage={setPage} />;
      case 'chat': return <ChatPage />;
      case 'group-chat': return <GroupChatPage />;
      case 'visual-search': return <VisualSearchPage products={products} favorites={favorites} toggleFav={toggleFav} showProduct={showProduct} />;
      case 'profile': return <ProfilePage setPage={setPage} favorites={favorites} products={products} />;
      case 'login': return <LoginPage setPage={setPage} />;
      case 'register': return <RegisterPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} products={products} favorites={favorites} toggleFav={toggleFav} showProduct={showProduct} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {!noLayout && <Navbar page={page} setPage={setPage} isLoggedIn={isLoggedIn} />}
      <div>{renderPage()}</div>
      {!noLayout && <Footer setPage={setPage} />}
    </div>
  );
}
