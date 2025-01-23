export interface IFollowedData {
  _id: string;
  follower_user_id: string;
  followed_user_id: {
    _id: string;
    username: string;
    image: string;
  };
  created_at: string;
  __v: number;
}
