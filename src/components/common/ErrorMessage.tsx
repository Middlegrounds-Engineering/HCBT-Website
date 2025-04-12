import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;