import React from 'react';
import { useReactionLimit } from '../../../hooks/useReactionLimit';
import { REACTIONS } from './constants';
import ReactionMessage from './ReactionMessage';

interface PostReactionsProps {
  reactions: Record<string, number>;
  onReact: (reaction: string) => Promise<void>;
}

const PostReactions: React.FC<PostReactionsProps> = ({ reactions, onReact }) => {
  const { canAddReaction, incrementReactionCount, remainingReactions } = useReactionLimit();

  const handleReaction = async (reaction: string) => {
    if (canAddReaction()) {
      await onReact(reaction);
      incrementReactionCount();
    }
  };

  return (
    <div className="border-t border-gray-200 pt-8 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">React to this post</h3>
        <ReactionMessage remainingReactions={remainingReactions} />
      </div>
      <div className="flex flex-wrap gap-4">
        {REACTIONS.map((reaction) => (
          <button
            key={reaction}
            onClick={() => handleReaction(reaction)}
            disabled={!canAddReaction()}
            className="flex flex-col items-center bg-white rounded-lg px-4 py-2 border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-2xl">{reaction}</span>
            <span className="text-sm text-gray-600 mt-1">
              {reactions[reaction] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostReactions;