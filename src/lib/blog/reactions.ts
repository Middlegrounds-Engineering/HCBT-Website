import { getSupabaseClient } from '../supabase/client';
import type { BlogReaction } from './types';

export async function fetchPostReactions(postId: string): Promise<Record<string, number>> {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  try {
    const { data, error } = await getSupabaseClient()
      .from('blog_reactions')
      .select('reaction_type')
      .eq('post_id', postId);

    if (error) throw error;

    const counts: Record<string, number> = {};
    data?.forEach(({ reaction_type }) => {
      counts[reaction_type] = (counts[reaction_type] || 0) + 1;
    });

    return counts;
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return {};
  }
}

export async function addReaction(postId: string, reaction: string): Promise<void> {
  if (!postId || !reaction) {
    throw new Error('Post ID and reaction are required');
  }

  const { error } = await getSupabaseClient()
    .from('blog_reactions')
    .insert({ 
      post_id: postId, 
      reaction_type: reaction 
    });

  if (error) {
    console.error('Error adding reaction:', error);
    throw new Error('Failed to add reaction');
  }
}