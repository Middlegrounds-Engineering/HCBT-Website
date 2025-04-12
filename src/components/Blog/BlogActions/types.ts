import type { BlogPost } from '../../../lib/blog';

export interface BlogActionsProps {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
}