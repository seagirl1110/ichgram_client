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
import FollowBtn from '../../components/followBtn/index.tsx';
import { IFollowedData } from '../../types/follow.ts';
import { getUserIdFromToken } from '../../utils/auth';
import axiosWithToken from '../../utils/axiosWithToken';

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

  const [isFollow, setIsFollow] = useState(false);

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

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();

    const existFollow = async (): Promise<boolean> => {
      try {
        const response = await axiosWithToken.get<{
          message: string;
          data: IFollowedData[];
        }>(`/follow/${userIdFromToken}/following`);

        const data = response.data.data;

        if (data.length !== 0) {
          return data.some(
            (item) =>
              item.follower_user_id === userIdFromToken &&
              item.followed_user_id._id === userId
          );
        }

        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    existFollow().then((data) => {
      if (data) {
        setIsFollow(true);
      }
    });
  }, [userId]);

  const handleEditProfile = (): void => {
    navigate(`/profile/${userId}/edit`);
  };

  const handleClickPost = (id: string): void => {
    setModalPostData({ isOpen: true, postId: id });
  };

  const handleClickActionsPost = (): void => {
    setIsModalActionsPostOpen(true);
  };

  const onFollow = async (): Promise<void> => {
    try {
      await axiosWithToken.post(`/follow/follow/${userId}`);
      refreshUserData(userId);
      setIsFollow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollow = async (): Promise<void> => {
    try {
      await axiosWithToken.delete(`/follow/unfollow/${userId}`);
      refreshUserData(userId);
      setIsFollow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickFollow = (): void => {
    if (isFollow) {
      onUnfollow();
    } else {
      onFollow();
    }
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
                      {!myProfile && (
                        <FollowBtn
                          isFollow={isFollow}
                          onClick={handleClickFollow}
                          typeStyle="primary"
                          minWidth={135}
                        />
                      )}
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
                    isFollow={isFollow}
                    onClickFollow={handleClickFollow}
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
