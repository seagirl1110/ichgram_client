import { IPost } from './post';

export interface IUserData {
  _id: string;
  full_name: string;
  username: string;
  email: string;
  bio: string;
  website: string;
  image: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
  posts: IPost[];
  followers: string[];
  following: string[];
  created_at: string;
}
