import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import BlogCard from './BlogCard';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import type { BlogPost } from '../../lib/blog';

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAdminAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    fetchPosts(); // Refresh the list after deletion
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          post={post}
          isAdmin={isAdmin}
          onEdit={() => {}} // To be implemented
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BlogList;