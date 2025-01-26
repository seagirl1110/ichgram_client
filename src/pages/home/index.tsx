import styles from './styles.module.css';
import MainContainer from '../../components/mainContainer';
import { useEffect, useState } from 'react';
import ModalContainer from '../../components/modal/index.tsx';
import Post from '../../components/post/index.tsx';
import { IFollowedData } from '../../types/follow.ts';
import { getUserIdFromToken } from '../../utils/auth';
import axiosWithToken from '../../utils/axiosWithToken';
import { IPostDataFull, IPostWithFollow } from '../../types/post.ts';
import PostPreviews from '../../components/postPreviews/index.tsx';
import Avatar from '../../components/avatar/index.tsx';
import Username from '../../components/username/index.tsx';
import Time from '../../components/time/index.tsx';
import postLikes from './../../assets/icons/post_likes.svg';
import postComments from './../../assets/icons/post_comments.svg';
import { ILikeData } from '../../types/like.ts';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchUser from '../../components/searchUser/index.tsx';

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postsList, setPostsList] = useState<IPostWithFollow[]>([]);

  const [modalPostData, setModalPostData] = useState({
    isOpen: false,
    postId: '',
    userId: '',
    isFollow: false,
  });

  const [isModalSearchUserOpen, setIsModalSearchUserOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.endsWith('search-user')) {
      setIsModalSearchUserOpen(true);
    } else {
      setIsModalSearchUserOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();

    const getFollowingList = async (): Promise<IFollowedData[]> => {
      try {
        const response = await axiosWithToken.get<{
          message: string;
          data: IFollowedData[];
        }>(`/follow/${userIdFromToken}/following`);

        const data = response.data.data;
        return data;
      } catch (error) {
        setError(`Failed to load following list. ${error}`);
        return [];
      }
    };

    const getPosts = async (): Promise<IPostDataFull[]> => {
      try {
        const response = await axiosWithToken.get<{
          message: string;
          data: IPostDataFull[];
        }>(`/post`);

        const data = response.data.data;
        return data;
      } catch (error) {
        setError(`Failed to load posts. ${error}`);
        return [];
      }
    };

    const getPostsWithFollow = async (): Promise<void> => {
      try {
        const followingList: IFollowedData[] = await getFollowingList();
        const followedUsers: string[] = followingList.map(
          (item) => item.followed_user_id._id
        );

        const posts: IPostDataFull[] = await getPosts();

        const postsWithFollow = posts
          .map((post) => ({
            ...post,
            isFollow: followedUsers.includes(post.user_id._id),
          }))
          .filter((post) => post.isFollow);

        setPostsList(postsWithFollow);
      } catch (error) {
        console.log(error);
        setError(`Failed to load posts. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getPostsWithFollow();
  }, []);

  const refreshPostData = async (postId: string): Promise<void> => {
    try {
      const response = await axiosWithToken.get<{
        message: string;
        data: IPostDataFull;
      }>(`/post/${postId}`);

      const postData = response.data.data;

      setPostsList((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, ...postData } : post
        )
      );
    } catch (error) {
      setError(`Failed to load post data. ${error}`);
    }
  };

  const handleClickPost = (
    postId: string,
    userId: string,
    isFollow: boolean
  ): void => {
    setModalPostData({ isOpen: true, postId, userId, isFollow });
  };

  const onFollow = async (userId: string): Promise<void> => {
    try {
      await axiosWithToken.post(`/follow/follow/${userId}`);

      setPostsList((prev) =>
        prev.map((post) =>
          post.user_id._id === userId ? { ...post, isFollow: true } : post
        )
      );

      if (modalPostData.userId === userId) {
        setModalPostData((prev) => ({ ...prev, isFollow: true }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollow = async (userId: string): Promise<void> => {
    try {
      await axiosWithToken.delete(`/follow/unfollow/${userId}`);

      setPostsList((prev) =>
        prev.map((post) =>
          post.user_id._id === userId ? { ...post, isFollow: false } : post
        )
      );

      if (modalPostData.userId === userId) {
        setModalPostData((prev) => ({ ...prev, isFollow: false }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickFollow = (isFollow: boolean, targetUserId: string): void => {
    if (isFollow) {
      onUnfollow(targetUserId);
    } else {
      onFollow(targetUserId);
    }
  };

  const closeModalPostData = async (): Promise<void> => {
    setModalPostData({
      isOpen: false,
      postId: '',
      userId: '',
      isFollow: false,
    });

    await refreshPostData(modalPostData.postId);
  };

  const handleLike = async (
    likes: ILikeData[],
    postId: string
  ): Promise<void> => {
    const isLike: boolean = likes.some(
      (item) => item.user_id === getUserIdFromToken()
    );

    try {
      if (isLike) {
        await axiosWithToken.delete(`/like/${postId}/unlike`);
      } else {
        await axiosWithToken.post(`/like/${postId}/like`);
      }

      await refreshPostData(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalSearchUser = (): void => {
    setIsModalSearchUserOpen(false);
    navigate('/home');
  };

  return (
    <MainContainer>
      <div className={styles.home_container}>
        <div className={styles.home_inner}>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              <div className={styles.posts_container}>
                {[...postsList].reverse().map((item, index) => (
                  <div className={styles.post} key={index}>
                    <div className={styles.post_row}>
                      <Avatar image={item.user_id.image} />
                      <Username
                        name={item.user_id.username}
                        id={item.user_id._id}
                      />
                      <Time time={item.created_at} />
                    </div>
                    <PostPreviews
                      images={item.images}
                      description={item.description}
                      onClick={() => {
                        handleClickPost(
                          item._id,
                          item.user_id._id,
                          item.isFollow
                        );
                      }}
                      width={404}
                      height={506}
                    />
                    <div className={styles.post_row}>
                      <div
                        className={styles.reactions_icon}
                        onClick={() => handleLike(item.likes, item._id)}
                      >
                        <img src={postLikes} alt="like" />
                      </div>
                      <div className={styles.reactions_icon}>
                        <img src={postComments} alt="comment" />
                      </div>
                    </div>
                    {item.likes_count > 0 && (
                      <div className={styles.likes_count}>
                        {item.likes_count} likes
                      </div>
                    )}
                    {item.description && (
                      <div className={styles.post_text}>{item.description}</div>
                    )}
                    {item.comments_count > 0 && (
                      <div
                        className={styles.comments_count}
                        onClick={() =>
                          handleClickPost(
                            item._id,
                            item.user_id._id,
                            item.isFollow
                          )
                        }
                      >
                        View all comments ({item.comments_count})
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {modalPostData.isOpen && (
                <ModalContainer onClick={closeModalPostData}>
                  <Post
                    postId={modalPostData.postId}
                    isFollow={modalPostData.isFollow}
                    onClickFollow={() =>
                      handleClickFollow(
                        modalPostData.isFollow,
                        modalPostData.userId
                      )
                    }
                  />
                </ModalContainer>
              )}
              {isModalSearchUserOpen && (
                <ModalContainer onClick={closeModalSearchUser} position="left">
                  <SearchUser />
                </ModalContainer>
              )}
            </>
          )}
        </div>
      </div>
    </MainContainer>
  );
}

export default Home;
