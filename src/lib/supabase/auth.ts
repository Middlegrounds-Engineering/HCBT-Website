import { getSupabaseClient } from './client';
import type { User, Session } from '@supabase/supabase-js';

export async function getCurrentSession(): Promise<Session | null> {
  const { data: { session } } = await getSupabaseClient().auth.getSession();
  return session;
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.user_metadata?.role === 'admin' ?? false;
}

export async function refreshSession(): Promise<void> {
  const { error } = await getSupabaseClient().auth.refreshSession();
  if (error) {
    console.error('Failed to refresh session:', error);
    throw error;
  }
}