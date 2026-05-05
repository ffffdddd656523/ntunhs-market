// src/hooks/useProducts.js
// 商品資料 Hook，自動從 Firestore 載入

import { useState, useEffect } from 'react';
import { getProducts } from '../firebase/products';

export function useProducts(category = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(category);
      setProducts(data);
    } catch (err) {
      console.error('載入商品失敗:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return { products, loading, error, refetch: fetchProducts };
}
