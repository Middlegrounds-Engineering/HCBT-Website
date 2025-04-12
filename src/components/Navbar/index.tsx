import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminShortcut } from './useAdminShortcut';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import Logo from '../common/Logo';

export default function Navbar() {
  const showAdmin = useAdminShortcut();
  const { isAdmin } = useAdminAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size="md" />
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-900">Home</Link>
            <Link to="/services" className="text-sm font-medium text-gray-500 hover:text-gray-900">Services</Link>
            <Link to="/blog" className="text-sm font-medium text-gray-500 hover:text-gray-900">Blog</Link>
            <Link to="/referrals" className="text-sm font-medium text-gray-500 hover:text-gray-900">Make a Referral</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-500 hover:text-gray-900">Contact</Link>
            {(showAdmin || isAdmin) && (
              <Link to="/admin" className="text-sm font-medium text-purple-600 hover:text-purple-700">Admin</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}