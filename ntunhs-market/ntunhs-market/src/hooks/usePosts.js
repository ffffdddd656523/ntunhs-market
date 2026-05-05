// src/hooks/usePosts.js
// 打工、換課資料 Hook

import { useState, useEffect } from 'react';
import { getJobs, getCourses } from '../firebase/posts';

export function useJobs(type = null) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await getJobs(type);
      setJobs(data);
    } catch (err) {
      console.error('載入打工資訊失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [type]);
  return { jobs, loading, refetch: fetch };
}

export function useCourses(type = null) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await getCourses(type);
      setCourses(data);
    } catch (err) {
      console.error('載入換課資訊失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [type]);
  return { courses, loading, refetch: fetch };
}
