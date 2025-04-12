import { useState, useCallback } from 'react';
import { deleteBlogPost } from '../../../lib/blog';
import { useToast } from '../../common/Toast/ToastContext';
import type { BlogPost } from '../../../lib/blog';

export const useDeletePost = (post: BlogPost, onDelete: () => void) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const handleDeleteClick = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      console.debug('Attempting to delete post:', post.id);
      await deleteBlogPost(post.id);
      showToast('Post deleted successfully', 'success');
      onDelete();
    } catch (error) {
      console.error('Error deleting post:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to delete post',
        'error'
      );
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  }, [post.id, onDelete, showToast]);

  return {
    showConfirm,
    isDeleting,
    handleDeleteClick,
    handleCancelDelete,
    handleConfirmDelete
  };
};