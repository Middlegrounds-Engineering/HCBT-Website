import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '../../common/ConfirmDialog';
import { useDeletePost } from './useDeletePost';
import type { BlogActionsProps } from './types';

export const BlogActions: React.FC<BlogActionsProps> = ({ post, onEdit, onDelete }) => {
  const {
    showConfirm,
    isDeleting,
    handleDeleteClick,
    handleCancelDelete,
    handleConfirmDelete
  } = useDeletePost(post, onDelete);

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-purple-600"
          title="Edit post"
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-2 text-gray-600 hover:text-red-600"
          disabled={isDeleting}
          title="Delete post"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};