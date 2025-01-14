import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainContainer from '../../components/mainContainer';
import Button from '../../components/button';
import { getUserIdFromToken } from '../../utils/auth';
import { IUserData } from '../../types/user';
import { BASE_URL } from '../../App';
import avatarIcon from './../../assets/icons/avatar.svg';
import websiteIcon from './../../assets/icons/profile_website_link.svg';

function Profile() {
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
    posts,
  } = userData;

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
                <div className={styles.content_inner}>
                  <div>{username}</div>
                  <Button name="Edit profile" />
                </div>
                <div className={styles.content_counter}>
                  <div>{posts_count} posts</div>
                  <div>{followers_count} followers</div>
                  <div>{following_count} following</div>
                </div>
                {bio && <div className={styles.content_bio}>{bio}</div>}
                {website && (
                  <div className={styles.content_website}>
                    <img
                      className={styles.content_website_icon}
                      src={websiteIcon}
                      alt="link_icon"
                    />
                    <Link className={styles.content_website_link} to="">
                      {website}
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.posts_container}>
              {posts.map((item, index) => (
                <div className={styles.post} key={index}>
                  <img
                    className={styles.post_image}
                    src={item.images[0]}
                    alt={item.description}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainContainer>
  );
}

export default Profile;
