import React from 'react';
import { BlogCardContent } from './BlogCardContent';
import { EditBlogModal } from './EditBlogModal';
import { useBlogCard } from './useBlogCard';
import type { BlogPost } from '../../../lib/blog';

interface BlogCardProps {
  post: BlogPost;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isAdmin, onEdit, onDelete }) => {
  const { showEditModal, handleEdit, handleCloseModal, handleUpdate } = useBlogCard(onEdit);

  return (
    <>
      <BlogCardContent
        post={post}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={onDelete}
      />

      {showEditModal && (
        <EditBlogModal
          post={post}
          isOpen={showEditModal}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default BlogCard;