import { getSupabaseClient } from './supabase/client';
import type { AuthError, AuthResponse } from '@supabase/supabase-js';

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await getSupabaseClient().auth.signInWithPassword({
      email,
      password
    });
    
    if (response.error) {
      throw response.error;
    }

    // Verify admin role
    const user = response.data.user;
    if (!user?.user_metadata?.role || user.user_metadata.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }
    
    return response;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const { error } = await getSupabaseClient().auth.signOut();
    if (error) throw error;
    window.location.href = '/'; // Redirect to home after logout
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const useAdmin = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await getSupabaseClient().auth.getUser();
    if (!user) return false;

    // Check for admin role in user metadata
    const isAdminUser = user.user_metadata?.role === 'admin';
    return isAdminUser;
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
};