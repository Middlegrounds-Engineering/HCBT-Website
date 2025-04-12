import { useState, useCallback } from 'react';
import { updateBlogPost, type BlogPost } from '../../../lib/blog';

export const useEditBlogModal = (
  post: BlogPost,
  onClose: () => void,
  onUpdate: () => void
) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateBlogPost(post.id, { title, content });
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err instanceof Error ? err.message : 'Error updating post');
    } finally {
      setLoading(false);
    }
  }, [post.id, title, content, onUpdate, onClose]);

  return {
    title,
    content,
    loading,
    error,
    handleTitleChange,
    handleContentChange,
    handleSubmit
  };
};