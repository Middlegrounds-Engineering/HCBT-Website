import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-200 border-t-purple-600"></div>
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;