import { getSupabaseClient } from '../supabase/client';
import { getCurrentUser } from '../supabase/auth';
import type { BlogPost } from './types';

export async function createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
  const user = await getCurrentUser();
  if (!user?.user_metadata?.role || user.user_metadata.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  const { data: post, error } = await getSupabaseClient()
    .from('blog_posts')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }

  return post;
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  const user = await getCurrentUser();
  if (!user?.user_metadata?.role || user.user_metadata.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  // First fetch the existing post
  const { data: existingPost, error: fetchError } = await getSupabaseClient()
    .from('blog_posts')
    .select()
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching blog post:', fetchError);
    throw fetchError;
  }

  if (!existingPost) {
    throw new Error('Blog post not found');
  }

  // Then update with new data
  const { data: updatedPost, error: updateError } = await getSupabaseClient()
    .from('blog_posts')
    .update({
      ...data,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    console.error('Error updating blog post:', updateError);
    throw updateError;
  }

  return updatedPost;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user?.user_metadata?.role || user.user_metadata.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  const { error } = await getSupabaseClient()
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}