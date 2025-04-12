import type { User } from '@supabase/supabase-js';

export function validateAdmin(user: User | null): void {
  if (!user?.user_metadata?.role || user.user_metadata.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }
}