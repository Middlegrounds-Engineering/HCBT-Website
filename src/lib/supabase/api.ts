import { getSupabaseClient } from './client';
import type { PostgrestError } from '@supabase/supabase-js';

export interface ApiResponse<T> {
  data: T | null;
  error: PostgrestError | null;
}

export async function fetchData<T>(
  table: string,
  query: Object
): Promise<ApiResponse<T>> {
  try {
    const response = await getSupabaseClient()
      .from(table)
      .select()
      .match(query);
      
    return {
      data: response.data as T,
      error: response.error
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: null,
      error: error as PostgrestError
    };
  }
}