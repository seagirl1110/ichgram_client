export interface IPost {
  _id: string;
  user_id: string;
  images: string[];
  description: string;
  likes_count: number;
  comments_count: number;
  likes: string[];
  comments: string[];
  created_at: string;
  __v: number;
}
