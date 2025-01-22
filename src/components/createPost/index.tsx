import styles from './styles.module.css';
import { useForm, FieldValues } from 'react-hook-form';
import axiosWithToken from '../../utils/axiosWithToken';
import Button from '../button';
import Avatar from '../avatar';
import Username from '../username';
import FormErrorContainer from '../formErrorContainer';
import smile from './../../assets/icons/post_smile.svg';

interface ICreatePostProps {
  username: string;
  userImage: string;
  createFunc: () => void;
}

function CreatePost({ username, userImage, createFunc }: ICreatePostProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitCreatePostForm = async (data: FieldValues): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('images', data.images[0]);
      formData.append('description', data.description);

      await axiosWithToken.post(`/post`, formData);

      createFunc();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={styles.create_post_container}
      onSubmit={handleSubmit(onSubmitCreatePostForm)}
    >
      <div className={styles.create_post_header}>
        <div className={styles.title}>Create new post</div>
        <div className={styles.actions}>
          <Button name="Share" type="submit" minWidth={75} typeStyle="text" />
        </div>
      </div>
      <div className={styles.create_post_info}>
        <div className={styles.image_container}>
          <input
            type="file"
            {...register('images', { required: 'Image is required' })}
            accept="image/*"
          />
        </div>
        <div className={styles.post_container}>
          <div className={styles.post_info}>
            <div className={styles.user_info}>
              <Avatar image={userImage} width={28} />
              <Username name={username} />
            </div>
            <textarea
              className={styles.add_post}
              placeholder="Add post"
              {...register('description', {
                maxLength: {
                  value: 2200,
                  message: 'Post max length is 2200 characters',
                },
              })}
            />
            <div className={styles.add_smile}>
              <img src={smile} alt="smile" />
            </div>
          </div>
          <div className={styles.create_post_errors}>
            {Object.keys(errors).length > 0 && (
              <FormErrorContainer errorList={errors} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
