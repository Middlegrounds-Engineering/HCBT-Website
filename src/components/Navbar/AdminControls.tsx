import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from '../../lib/adminAuth';
import { useToast } from '../common/Toast/ToastContext';

export const AdminControls = () => {
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
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
      title="Logout"
    >
      <LogOut className="h-4 w-4 mr-1" />
      Logout
    </button>
  );
};