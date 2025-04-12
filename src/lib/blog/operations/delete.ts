import { getSupabaseClient } from '../../supabase/client';
import { getCurrentUser } from '../../supabase/auth';
import { validateAdmin } from '../utils/auth';

export async function deleteBlogPost(id: string): Promise<void> {
  console.debug('Starting delete operation for post:', id);
  
  const user = await getCurrentUser();
  validateAdmin(user);
  console.debug('Admin validation passed');

  const supabase = getSupabaseClient();
  
  // First verify the post exists
  const { data: existingPost, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id')
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

  console.debug('Post found, proceeding with deletion');

  // Then delete it
  const { error: deleteError } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
    .single();

  if (deleteError) {
    console.error('Error deleting post:', deleteError);
    throw new Error(`Failed to delete post: ${deleteError.message}`);
  }

  console.debug('Post deleted successfully');
}