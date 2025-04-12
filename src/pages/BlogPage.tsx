import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from '../components/Blog/BlogList';
import BlogPost from '../components/Blog/BlogPost';
import AdminBlogForm from '../components/Blog/AdminBlogForm';
import AdminLogin from '../components/Admin/AdminLogin';
import AdminControls from '../components/Blog/AdminControls';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAdminAuth } from '../hooks/useAdminAuth';

const BlogPage = () => {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const { isAdmin, loading, error } = useAdminAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Admin auth error:', error);
  }

  return (
    <Routes>
      <Route
        index
        element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Latest Articles</h1>
              {isAdmin && (
                <AdminControls 
                  showAdminForm={showAdminForm}
                  onToggleForm={() => setShowAdminForm(!showAdminForm)}
                />
              )}
            </div>
            
            {showAdminForm ? (
              isAdmin ? <AdminBlogForm /> : <AdminLogin onSuccess={() => window.location.reload()} />
            ) : (
              <BlogList />
            )}
          </div>
        }
      />
      <Route path=":slug" element={<BlogPost />} />
    </Routes>
  );
}

export default BlogPage;