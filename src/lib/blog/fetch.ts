import { getSupabaseClient } from '../supabase/client';
import type { BlogPost } from './types';

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  if (!slug) {
    throw new Error('Slug is required');
  }

  const client = getSupabaseClient();
  const cleanSlug = slug.replace(/['"]/g, '').trim();
  
  const { data, error } = await client
    .from('blog_posts')
    .select()
    .eq('slug', cleanSlug)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    throw new Error('Failed to load blog post');
  }

  if (!data) {
    throw new Error('Blog post not found');
  }

  // If post has a storage_path, get the public URL
  if (data.storage_path) {
    const { data: { publicUrl } } = client
      .storage
      .from('blog_images')
      .getPublicUrl(data.storage_path);
    
    data.image_url = publicUrl;
  }

  return data;
}