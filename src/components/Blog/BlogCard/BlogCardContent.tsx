import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/dateUtils';
import { BlogActions } from '../BlogActions';
import type { BlogPost } from '../../../lib/blog';

interface BlogCardContentProps {
  post: BlogPost;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const BlogCardContent: React.FC<BlogCardContentProps> = ({ 
  post, 
  isAdmin, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.image_url && (
        <img 
          src={post.image_url} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
          {isAdmin && onEdit && onDelete && (
            <BlogActions 
              post={post}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{formatDate(post.created_at)}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};