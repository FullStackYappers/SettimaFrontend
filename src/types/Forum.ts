export interface User {
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

export interface DiscussionDetails {
  id: number;
  movie_id: number;
  user_id: number;
  title: string;
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
  comments_count: number;
  likes: Likes[];
  likes_count: number;
  comments: DiscussionComment[];
  user: User;
  tags: Tags[];
}

export interface DiscussionComment {
  id: number;
  discussion_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
  replies: CommentReply[];
  likes: Likes[];
  likes_count: number;
  replies_count: number;
  user_liked: boolean;
}

export interface CommentReply {
  id: number;
  comment_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
  likes: Likes[];
  likes_count: number;
  user_liked: boolean;
}

export interface Likes {
  id: number;
  user_id: number;
  likeable_type: string;
  likeable_id: number;
  created_at: string;
  updated_at: string;
}

export interface Tags {
id: number; 
name: string; 
created_at: string; 
updated_at: string; 
pivot: { discussion_id: number; tag_id: number}[];
}