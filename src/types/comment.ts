export interface ICommentData {
  _id: string;
  user_id: {
    _id: string;
    username: string;
    image: string;
  };
  ref_id: string;
  ref_type: 'Post' | 'Comment';
  text: string;
  likes_count: number;
  comments_count: number;
  likes: string[];
  comments: string[];
  created_at: string;
  __v: number;
}
