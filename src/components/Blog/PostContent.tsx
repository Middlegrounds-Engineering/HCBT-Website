import React from 'react';
import { formatDate } from '../../utils/dateUtils';

interface PostContentProps {
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  createdAt: string;
}

const PostContent: React.FC<PostContentProps> = ({ 
  title, 
  content, 
  excerpt, 
  imageUrl, 
  createdAt 
}) => {
  return (
    <>
      {imageUrl && (
        <div className="relative w-full mb-8">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full max-h-[600px] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="text-gray-600 mb-8">{formatDate(createdAt)}</div>
      
      {excerpt && (
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <p className="text-lg text-gray-700 italic">{excerpt}</p>
        </div>
      )}
      
      <div className="prose prose-purple max-w-none mb-12">
        {content.split('\n').map((paragraph, index) => (
          paragraph && <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
        ))}
      </div>
    </>
  );
};

export default PostContent;