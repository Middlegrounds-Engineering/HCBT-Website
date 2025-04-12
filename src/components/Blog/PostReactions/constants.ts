export const REACTIONS = ['❤️', '👍', '🎉', '👏', '🤔', '😊'] as const;

export type ReactionType = typeof REACTIONS[number];