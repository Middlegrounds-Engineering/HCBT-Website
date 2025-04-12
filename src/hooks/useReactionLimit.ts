import { useState, useCallback } from 'react';

const MAX_REACTIONS_PER_SESSION = 3;

export function useReactionLimit() {
  const [reactionCount, setReactionCount] = useState<number>(0);

  const canAddReaction = useCallback(() => {
    return reactionCount < MAX_REACTIONS_PER_SESSION;
  }, [reactionCount]);

  const incrementReactionCount = useCallback(() => {
    setReactionCount(prev => prev + 1);
  }, []);

  const remainingReactions = MAX_REACTIONS_PER_SESSION - reactionCount;

  return {
    canAddReaction,
    incrementReactionCount,
    remainingReactions
  };
}