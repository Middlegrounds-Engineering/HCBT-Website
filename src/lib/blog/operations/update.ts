import { getSupabaseClient } from '../../supabase/client';
import { getCurrentUser } from '../../supabase/auth';
import { validateAdmin } from '../utils/auth';
import type { BlogPost } from '../types';

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  console.debug('Starting update operation for post:', id);
  
  const user = await getCurrentUser();
  validateAdmin(user);
  console.debug('Admin validation passed');

  const supabase = getSupabaseClient();

  // First verify the post exists
  const { data: existingPost, error: fetchError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    throw new Error(`Failed to fetch post: ${fetchError.message}`);
  }

  if (!existingPost) {
    console.error('Post not found:', id);
    throw new Error('Blog post not found');
  }

  console.debug('Post found, proceeding with update');

  // Then update it
  const { data: updatedPost, error: updateError } = await supabase
    .from('blog_posts')
    .update({
      ...data,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    console.error('Error updating post:', updateError);
    throw new Error(`Failed to update post: ${updateError.message}`);
  }

  if (!updatedPost) {
    throw new Error('Failed to retrieve updated post');
  }

  console.debug('Post updated successfully');
  return updatedPost;
}