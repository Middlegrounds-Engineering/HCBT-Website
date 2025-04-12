import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteBlogPost } from '../../lib/blog';
import type { BlogPost } from '../../lib/blog';

interface BlogActionsProps {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
}

export const BlogActions: React.FC<BlogActionsProps> = ({ post, onEdit, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogPost(post.id);
        onDelete();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-2 text-gray-600 hover:text-purple-600"
        title="Edit post"
      >
        <Pencil className="h-5 w-5" />
      </button>
      <button
        onClick={handleDelete}
        className="p-2 text-gray-600 hover:text-red-600"
        title="Delete post"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};