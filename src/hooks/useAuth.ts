import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getCurrentSession, getCurrentUser, refreshSession } from '../lib/supabase/auth';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadSession() {
      try {
        const currentSession = await getCurrentSession();
        const currentUser = await getCurrentUser();
        
        setSession(currentSession);
        setUser(currentUser);
        
        if (currentSession && Date.now() > currentSession.expires_at * 1000) {
          await refreshSession();
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load session'));
        console.error('Session load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  return { session, user, loading, error };
}