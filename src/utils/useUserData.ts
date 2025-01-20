import { useState, useEffect } from 'react';
import axiosWithToken from './axiosWithToken.ts';
import { IUserData } from '../types/user.ts';
import { getUserIdFromToken } from './auth.ts';

interface IUseUserDataReturn {
  userData: IUserData;
  loading: boolean;
  error: string | null;
  myProfile: boolean;
}

const useUserData = (userId: string): IUseUserDataReturn => {
  const [userData, setUserData] = useState<IUserData>({
    _id: '',
    full_name: '',
    username: '',
    email: '',
    bio: '',
    website: '',
    image: '',
    posts_count: 0,
    followers_count: 0,
    following_count: 0,
    posts: [],
    followers: [],
    following: [],
    created_at: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<boolean>(false);

  useEffect(() => {
    const userIdFromToken: string | null = getUserIdFromToken();

    if (userId === userIdFromToken) {
      setMyProfile(true);
    }

    const getUserData = async (userId: string): Promise<void> => {
      try {
        const response = await axiosWithToken.get<{
          message: string;
          data: IUserData;
        }>(`/user/${userId}`);

        setUserData(response.data.data);
      } catch (err) {
        setError(`Failed to load user data. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    getUserData(userId);
  }, [userId]);

  return { userData, loading, error, myProfile };
};

export default useUserData;
