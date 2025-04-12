export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  storage_path?: string;
  created_at: string;
}

export interface BlogReaction {
  id: string;
  post_id: string;
  reaction_type: string;
  created_at: string;
}