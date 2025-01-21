import styles from './styles.module.css';
import { useForm, FieldValues } from 'react-hook-form';
import usePostData from '../../utils/usePostData';
import Avatar from '../avatar';
import Username from '../username';
import Time from '../time';
import postMore from './../../assets/icons/post_more.svg';
import postLikes from './../../assets/icons/post_likes.svg';
import postComments from './../../assets/icons/post_comments.svg';
import addComment from './../../assets/icons/post_comment_smile.svg';
import axiosWithToken from '../../utils/axiosWithToken';
import { getUserIdFromToken } from '../../utils/auth';
import Button from '../button';

interface IPostProps {
  postId: string;
}

function Post({ postId }: IPostProps) {
  const { postData, loading, error, myProfile, refreshPostData } =
    usePostData(postId);

  const {
    user_id,
    images,
    description,
    likes,
    likes_count,
    comments_count,
    comments,
    created_at,
  } = postData;

  const { register, handleSubmit } = useForm();

  const onSubmitCommentForm = async (data: FieldValues): Promise<void> => {
    try {
      await axiosWithToken.post(`/comment/${postId}`, data);
      await refreshPostData(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (): Promise<void> => {
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

  return (
    <div className={styles.post_container}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className={styles.image_container}>
            <img
              className={styles.post_image}
              src={images[0]}
              alt="post_image"
            />
          </div>
          <div className={styles.post}>
            <div className={styles.post_profile}>
              <Avatar image={user_id.image} />
              <Username name={user_id.username} />
              {myProfile ? (
                <div className={styles.post_more_btn}>
                  <img src={postMore} alt="more" />
                </div>
              ) : (
                <div>
                  <div></div>
                  <Button name="Follow" typeStyle="text" minWidth={85} />
                </div>
              )}
            </div>
            <div className={styles.post_content}>
              <Avatar image={user_id.image} />
              <div className={styles.info}>
                <div>
                  <Username name={user_id.username} />
                  <span className={styles.text}>{description}</span>
                </div>
                <Time time={created_at} />
              </div>
            </div>
            <div className={styles.post_comment_list}>
              {comments.map((item, index) => (
                <div className={styles.comment} key={index}>
                  <Avatar image={item.user_id.image} />
                  <div className={styles.info}>
                    <div>
                      <Username name={item.user_id.username} />
                      <span className={styles.text}>{item.text}</span>
                    </div>
                    <Time time={item.created_at} />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.reactions_wrapper}>
              <div className={styles.reactions_inner}>
                <div className={styles.reactions_icon} onClick={handleLike}>
                  <img src={postLikes} alt="like" />
                </div>
                <div className={styles.reactions_count}>
                  {likes_count} likes
                </div>
              </div>
              <div className={styles.reactions_inner}>
                <div className={styles.reactions_icon}>
                  <img src={postComments} alt="comment" />
                </div>
                <div className={styles.reactions_count}>
                  {comments_count} comments
                </div>
              </div>
            </div>
            <div className={styles.add_comment_container}>
              <div className={styles.add_comment_img}>
                <img src={addComment} alt="img" />
              </div>
              <form
                className={styles.add_comment_form}
                onSubmit={handleSubmit(onSubmitCommentForm)}
              >
                <input
                  className={styles.add_comment_input}
                  type="text"
                  placeholder="Add comment"
                  {...register('text', { required: true })}
                />
                <div className={styles.add_comment_btn}>
                  <Button
                    name="Send"
                    type="submit"
                    typeStyle="text"
                    minWidth={85}
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
