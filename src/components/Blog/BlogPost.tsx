import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogPost, fetchPostReactions, addReaction, type BlogPost } from '../../lib/blog';
import PostContent from './PostContent';
import PostReactions from './PostReactions';
import ContactSection from './ContactSection';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No blog post specified');
      setLoading(false);
      return;
    }

    loadPost(slug);
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const postData = await fetchBlogPost(postSlug);
      setPost(postData);
      
      const reactionData = await fetchPostReactions(postData.id);
      setReactions(reactionData);
    } catch (err) {
      console.error('Error loading blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to load the blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (reaction: string) => {
    if (!post) return;
    
    try {
      await addReaction(post.id, reaction);
      const updatedReactions = await fetchPostReactions(post.id);
      setReactions(updatedReactions);
    } catch (err) {
      console.error('Error adding reaction:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    return <ErrorMessage message={error || 'Post not found'} />;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PostContent
        title={post.title}
        content={post.content}
        excerpt={post.excerpt}
        imageUrl={post.image_url}
        createdAt={post.created_at}
      />
      <PostReactions
        reactions={reactions}
        onReact={handleReaction}
      />
      <ContactSection />
    </article>
  );
};

export default BlogPost;