import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: string;
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const styles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border ${styles[type as keyof typeof styles]}`}>
      <span className="mr-2">{icons[type as keyof typeof icons]}</span>
      <p>{message}</p>
    </div>
  );
};