import styles from './styles.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MainContainer from '../../components/mainContainer';
import Button from '../../components/button';
import avatarIcon from './../../assets/icons/avatar.svg';
import websiteIcon from './../../assets/icons/profile_website_link.svg';
import useUserData from '../../utils/useUserData.ts';

function Profile() {
  const { userId } = useParams();

  if (!userId) {
    throw new Error('userId is not found');
  }

  const { userData, loading, error, myProfile } = useUserData(userId);

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

  const navigate = useNavigate();

  const handleEditProfile = (): void => {
    navigate(`/profile/${userId}/edit`);
  };

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
                  <div className={styles.content_name}>{username}</div>
                  <div className={styles.content_actions}>
                    {myProfile && (
                      <Button
                        name="Edit profile"
                        onClick={handleEditProfile}
                        typeStyle="secondary"
                        minWidth={170}
                      />
                    )}
                    {!myProfile && <Button name="Follow" minWidth={135} />}
                    {!myProfile && (
                      <Button
                        name="Message"
                        typeStyle="secondary"
                        minWidth={190}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.content_counter_container}>
                  <div className={styles.content_counter}>
                    <span className={styles.content_counter_count}>
                      {posts_count}{' '}
                    </span>
                    <span>posts</span>
                  </div>
                  <div className={styles.content_counter}>
                    <span className={styles.content_counter_count}>
                      {followers_count}{' '}
                    </span>
                    <span>followers</span>
                  </div>
                  <div className={styles.content_counter}>
                    <span className={styles.content_counter_count}>
                      {following_count}{' '}
                    </span>
                    <span>following</span>
                  </div>
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
