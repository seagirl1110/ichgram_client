import { ICommentData } from './comment';
import { ILikeData } from './like';

export interface IPostData {
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

export interface IPostDataFull {
  _id: string;
  user_id: {
    _id: string;
    username: string;
    image: string;
  };
  images: string[];
  description: string;
  likes_count: number;
  comments_count: number;
  likes: ILikeData[];
  comments: ICommentData[];
  created_at: string;
  __v: number;
}
