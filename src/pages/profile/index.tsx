import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MainContainer from '../../components/mainContainer';
import Button from '../../components/button';
import { getUserIdFromToken } from '../../utils/auth';
import { IUserData } from '../../types/user';
import { BASE_URL } from '../../App';
import avatarIcon from './../../assets/icons/avatar.svg';

function Profile() {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      try {
        const userId: string | null = getUserIdFromToken();

        if (!userId) {
          throw new Error('userId not found');
        }

        const response = await axios.get<{ message: string; data: IUserData }>(
          `${BASE_URL}/user/${userId}`
        );

        setUserData(response.data.data);
      } catch (err) {
        setError('Failed to load user data');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const {
    username,
    bio,
    website,
    image,
    posts_count,
    followers_count,
    following_count,
  } = userData || {};

  return (
    <MainContainer>
      <div className={styles.profile_container}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className={styles.content_container}>
              <div className={styles.avatar_container}>
                <img
                  className={styles.avatar}
                  src={image ? image : avatarIcon}
                  alt="avatar"
                />
              </div>
              <div className={styles.content}>
                <div>
                  {username && <div>{username}</div>}
                  <Button name="Edit profile" secondary="true" />
                </div>
                <div>
                  <div>{posts_count} posts</div>
                  <div>{followers_count} followers</div>
                  <div>{following_count} following</div>
                </div>
                {bio && <div>{bio}</div>}
                {website && <div>{website}</div>}
              </div>
            </div>
            <div className={styles.posts}>posts</div>
          </>
        )}
      </div>
    </MainContainer>
  );
}

export default Profile;
