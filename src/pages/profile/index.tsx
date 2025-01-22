import styles from './styles.module.css';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import MainContainer from '../../components/mainContainer';
import Button from '../../components/button';
import Avatar from '../../components/avatar/index.tsx';
import websiteIcon from './../../assets/icons/profile_website_link.svg';
import useUserData from '../../utils/useUserData.ts';
import { useEffect, useState } from 'react';
import ModalContainer from '../../components/modal/index.tsx';
import Post from '../../components/post/index.tsx';
import CreatePost from '../../components/createPost/index.tsx';
import ActionsPost from '../../components/actionsPost/index.tsx';

function Profile() {
  const { userId } = useParams();

  if (!userId) {
    throw new Error('userId is not found');
  }

  const [modalPostData, setModalPostData] = useState({
    isOpen: false,
    postId: '',
  });
  const [isModalCreatePostOpen, setIsModalCreatePostOpen] = useState(false);
  const [isModalActionsPostOpen, setIsModalActionsPostOpen] = useState(false);

  const { userData, loading, error, myProfile, refreshUserData } =
    useUserData(userId);

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
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('create-post')) {
      setIsModalCreatePostOpen(true);
    } else {
      setIsModalCreatePostOpen(false);
    }
  }, [pathname]);

  const handleEditProfile = (): void => {
    navigate(`/profile/${userId}/edit`);
  };

  const handleClickPost = (id: string): void => {
    setModalPostData({ isOpen: true, postId: id });
  };

  const handleClickActionsPost = (): void => {
    setIsModalActionsPostOpen(true);
  };

  const closeModalPostData = (): void => {
    setModalPostData({ isOpen: false, postId: '' });
  };

  const closeModalCreatePost = (): void => {
    setIsModalCreatePostOpen(false);
    navigate(`/profile/${userId}`);
  };

  const closeModalActionsPost = (): void => {
    setIsModalActionsPostOpen(false);
  };

  const createPostFunc = () => {
    closeModalCreatePost();
    refreshUserData(userId);
  };

  const deletePostFunc = () => {
    closeModalActionsPost();
    closeModalPostData();
    refreshUserData(userId);
  };

  return (
    <MainContainer>
      <div className={styles.profile_container}>
        <div className={styles.profile_inner}>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              <div className={styles.content_container}>
                <Avatar image={image} width={168} active={true} />
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
                {[...posts].reverse().map((item, index) => (
                  <div
                    className={styles.post}
                    key={index}
                    onClick={() => {
                      handleClickPost(item._id);
                    }}
                  >
                    <img
                      className={styles.post_image}
                      src={item.images[0]}
                      alt={item.description}
                    />
                  </div>
                ))}
              </div>
              {modalPostData.isOpen && (
                <ModalContainer onClick={closeModalPostData}>
                  <Post
                    postId={modalPostData.postId}
                    actionsFunc={handleClickActionsPost}
                  />
                </ModalContainer>
              )}
              {isModalCreatePostOpen && (
                <ModalContainer onClick={closeModalCreatePost}>
                  <CreatePost
                    username={username}
                    userImage={image}
                    createFunc={createPostFunc}
                  />
                </ModalContainer>
              )}

              {isModalActionsPostOpen && (
                <ModalContainer onClick={closeModalActionsPost}>
                  <ActionsPost
                    postId={modalPostData.postId}
                    deleteFunc={deletePostFunc}
                  />
                </ModalContainer>
              )}
            </>
          )}
        </div>
      </div>
    </MainContainer>
  );
}

export default Profile;
