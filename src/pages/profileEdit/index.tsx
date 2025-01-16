import styles from './styles.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import axiosWithToken from '../../utils/axiosWithToken';
import MainContainer from '../../components/mainContainer';
import Button from '../../components/button';
import FormErrorContainer from '../../components/formErrorContainer';
import useUserData from '../../utils/useUserData';
import avatarIcon from './../../assets/icons/avatar.svg';

function ProfileEdit() {
  const { userId } = useParams();

  if (!userId) {
    throw new Error('userId not found');
  }

  const { userData, loading, error, myProfile } = useUserData(userId);

  const { username, bio, website, image } = userData;

  interface IInputData {
    value: string;
    name: string;
    label: string;
  }

  const inputList: IInputData[] = [
    {
      value: '',
      name: 'username',
      label: 'Username',
    },
    {
      value: website,
      name: 'website',
      label: 'Website',
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const onSubmitForm = async (data: FieldValues): Promise<void> => {
    try {
      await axiosWithToken.put('/user/update', data);

      navigate(`/profile/${userId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data.message;
        if (errMsg === 'this username is taken') {
          setError('username', {
            type: 'manual',
            message:
              'This username is already taken. Leave the field blank if you do not want to change the username.',
          });
        }
      }
    }
  };

  return (
    <MainContainer>
      <div className={styles.edit_profile_wrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          myProfile && (
            <>
              <div className={styles.edit_profile_inner}>
                <h3 className={styles.title_page}>Edit profile</h3>
                <div className={styles.content}>
                  <div className={styles.avatar_container}>
                    <img
                      className={styles.avatar}
                      src={image ? image : avatarIcon}
                      alt="avatar"
                    />
                  </div>
                  <div className={styles.content_inner}>
                    <div className={styles.content_name}>{username}</div>
                    <div className={styles.content_bio}>{bio}</div>
                  </div>
                  <div className={styles.content_actions}>
                    <Button name="New photo" />
                  </div>
                </div>
                <form
                  className={styles.form_container}
                  onSubmit={handleSubmit(onSubmitForm)}
                >
                  <div className={styles.input_list_container}>
                    {inputList.map((item, index) => (
                      <label className={styles.label_container} key={index}>
                        <span className={styles.label}>{item.label}</span>
                        <input
                          className={styles.input}
                          type="text"
                          defaultValue={item.value}
                          {...register(item.name)}
                        />
                      </label>
                    ))}
                    <label className={styles.label_container}>
                      <span className={styles.label}>About</span>
                      <textarea
                        className={styles.input}
                        defaultValue={bio}
                        {...register('bio', {
                          maxLength: {
                            value: 150,
                            message:
                              'About must be no more than 150 characters',
                          },
                        })}
                      />
                    </label>
                    {Object.keys(errors).length > 0 && (
                      <FormErrorContainer errorList={errors} />
                    )}
                  </div>
                  <div className={styles.form_actions}>
                    <Button name="Save" type="submit" minWidth={268} />
                  </div>
                </form>
              </div>
            </>
          )
        )}
      </div>
    </MainContainer>
  );
}

export default ProfileEdit;
