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

function Explore() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postsList, setPostsList] = useState<IPostWithFollow[]>([]);

  const [modalPostData, setModalPostData] = useState({
    isOpen: false,
    postId: '',
    userId: '',
    isFollow: false,
  });

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

        const postsWithFollow = posts.map((post) => ({
          ...post,
          isFollow: followedUsers.includes(post.user_id._id),
        }));

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

  const closeModalPostData = (): void => {
    setModalPostData({
      isOpen: false,
      postId: '',
      userId: '',
      isFollow: false,
    });
  };

  return (
    <MainContainer>
      <div className={styles.explore_container}>
        <div className={styles.explore_inner}>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              <div className={styles.posts_container}>
                {[...postsList].reverse().map((item, index) => (
                  <PostPreviews
                    key={index}
                    images={item.images}
                    description={item.description}
                    onClick={() => {
                      handleClickPost(
                        item._id,
                        item.user_id._id,
                        item.isFollow
                      );
                    }}
                  />
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
            </>
          )}
        </div>
      </div>
    </MainContainer>
  );
}

export default Explore;
