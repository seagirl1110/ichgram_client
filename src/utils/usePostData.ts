import { useState, useEffect } from 'react';
import axiosWithToken from './axiosWithToken.ts';
import { IPostDataFull } from '../types/post.tsx';
import { getUserIdFromToken } from './auth.ts';

interface IUsePostDataReturn {
  postData: IPostDataFull;
  loading: boolean;
  error: string | null;
  myProfile: boolean;
  refreshPostData: (postId: string) => Promise<void>;
}

const usePostData = (postId: string): IUsePostDataReturn => {
  const [postData, setPostData] = useState<IPostDataFull>({
    _id: '',
    user_id: { _id: '', username: '', image: '' },
    images: [],
    description: '',
    likes_count: 0,
    comments_count: 0,
    likes: [],
    comments: [],
    created_at: '',
    __v: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<boolean>(false);

  const getPostData = async (postId: string): Promise<void> => {
    const userIdFromToken: string | null = getUserIdFromToken();
    try {
      const response = await axiosWithToken.get<{
        message: string;
        data: IPostDataFull;
      }>(`/post/${postId}`);

      const post = response.data.data;
      setPostData(post);

      if (post.user_id._id === userIdFromToken) {
        setMyProfile(true);
      }
    } catch (err) {
      setError(`Failed to load user data. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData(postId);
  }, [postId]);

  return { postData, loading, error, myProfile, refreshPostData: getPostData };
};

export default usePostData;
