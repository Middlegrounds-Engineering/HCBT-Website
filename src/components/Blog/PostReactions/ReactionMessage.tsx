import React from 'react';

interface ReactionMessageProps {
  remainingReactions: number;
}

const ReactionMessage: React.FC<ReactionMessageProps> = ({ remainingReactions }) => {
  if (remainingReactions > 0) {
    return (
      <span className="text-sm text-gray-600">
        {remainingReactions} reactions remaining
      </span>
    );
  }

  return (
    <p className="text-sm text-gray-500 mt-4">
      Thank you very much for your reactions to this post!
    </p>
  );
};

export default ReactionMessage;