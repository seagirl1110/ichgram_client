export interface ILikeData {
  _id: string;
  user_id: string;
  ref_id: string;
  ref_type: 'Post' | 'Comment';
  created_at: string;
  __v: number;
}
