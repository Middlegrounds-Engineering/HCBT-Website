import React from 'react';
import { signOut } from '../../lib/adminAuth';
import { useToast } from '../common/Toast/ToastContext';

interface AdminControlsProps {
  showAdminForm: boolean;
  onToggleForm: () => void;
}

export default function AdminControls({ showAdminForm, onToggleForm }: AdminControlsProps) {
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      showToast('Logged out successfully', 'success');
    } catch (error) {
      showToast('Failed to log out', 'error');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onToggleForm}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
      >
        {showAdminForm ? 'View Articles' : 'Add New Article'}
      </button>
      <button
        onClick={handleLogout}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
}