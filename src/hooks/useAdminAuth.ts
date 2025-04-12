import { useState, useEffect } from 'react';
import { useAdmin } from '../lib/adminAuth';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        const adminStatus = await useAdmin();
        setIsAdmin(adminStatus);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to check admin status'));
        console.error('Admin check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return { isAdmin, loading, error };
}