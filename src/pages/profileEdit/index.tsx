import styles from './styles.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import MainContainer from '../../components/mainContainer';
import Button from '../../components/button';
import FormErrorContainer from '../../components/formErrorContainer';
import useUserData from '../../utils/useUserData';
import avatarIcon from './../../assets/icons/avatar.svg';
import { BASE_URL } from '../../App';

function ProfileEdit() {
  const { userId } = useParams();

  if (!userId) {
    throw new Error('userId not found');
  }

  const { userData, loading, error, myProfile } = useUserData(userId);

  const { username, bio, website, image } = userData;

  interface IInputData {
    placeholder: string;
    name: string;
    label: string;
    validation?: object;
  }

  const inputList: IInputData[] = [
    {
      placeholder: username,
      name: 'username',
      label: 'Username',
    },
    {
      placeholder: website,
      name: 'website',
      label: 'Website',
    },
    {
      placeholder: bio,
      name: 'bio',
      label: 'About',
      validation: {
        maxLength: {
          value: 150,
          message: 'About must be no more than 150 characters',
        },
      },
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
      await axios.put(`${BASE_URL}/user/update`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate(`/profile/${userId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data.message;
        if (errMsg === 'this username is taken') {
          setError('username', {
            type: 'manual',
            message: 'This username is already taken.',
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
                  <div>
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
                          placeholder={item.placeholder}
                          {...register(item.name, item.validation)}
                        />
                      </label>
                    ))}
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <FormErrorContainer errorList={errors} />
                  )}
                  <Button name="Save" type="submit" />
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
