export interface fetchUser {
  id: number;
  name: string;
  username: string;
  about: string;
  email: string;
  profile_picture: string | null;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  is_admin: boolean;
}

export interface fetchComment {
  id: number;
  discussion_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: fetchUser;
  replies: fetchComment[];
  likes: { id: number; user_id: number; likeable_type: string; likeable_id: number; created_at: string; updated_at: string }[];
}

export interface discussionDetails {
  id: number;
  movie_id: number;
  user_id: number;
  title: string;
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
  comments_count: number;
  likes_count: number;
  comments: fetchComment[];
  user: fetchUser;
  tags: tags[];
}

export interface tags {
id: number; 
name: string; 
created_at: string; 
updated_at: string; 
pivot: { discussion_id: number; tag_id: number}[];
}