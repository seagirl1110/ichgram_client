import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '../../App';
import AuthContainer from '../../components/authContainer';
import AuthLink from '../../components/authLink';
import Button from '../../components/button';
import FormInputContainer from '../../components/formInputContainer';
import { IFormInputData } from '../../components/formInput';
import FormErrorContainer from '../../components/formErrorContainer';

function AuthRegister() {
  const inputList: IFormInputData[] = [
    {
      type: 'email',
      placeholder: 'Email',
      name: 'email',
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    {
      type: 'text',
      placeholder: 'Full Name',
      name: 'full_name',
      validation: {
        required: 'Full name is required',
        minLength: {
          value: 4,
          message: 'Full name must be at least 4 characters',
        },
      },
    },
    {
      type: 'text',
      placeholder: 'Username',
      name: 'username',
      validation: { required: 'Username is required' },
    },
    {
      type: 'text',
      placeholder: 'Password',
      name: 'password',
      validation: {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
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
      await axios.post(`${BASE_URL}/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data.message;
        if (
          errMsg ===
          'User with such username or email is already has been register'
        ) {
          setError('email', {
            type: 'manual',
            message: 'This email or username is already taken.',
          });
          setError('username', {
            type: 'manual',
            message: 'This username or email is already taken.',
          });
        }
      }
    }
  };

  return (
    <main className={styles.auth_register_container}>
      <AuthContainer>
        <div className={styles.register_info_container}>
          <h1 className={styles.title}>
            Sign up to see photos and videos from your friends.
          </h1>
          <form
            className={styles.form_container}
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <FormInputContainer inputList={inputList} register={register} />
            {Object.keys(errors).length > 0 && (
              <FormErrorContainer errorList={errors} />
            )}
            <div className={styles.text_wrapper}>
              <div className={styles.text_container}>
                <p className={styles.text}>
                  People who use our service may have uploaded
                </p>
                <p className={styles.text}>
                  {' '}
                  your contact information to Instagram.
                </p>
                <Link className={styles.link} to="">
                  Learn More
                </Link>
              </div>
              <div className={styles.text_container}>
                <p className={styles.text}>By signing up, you agree to our</p>
                <Link className={styles.link} to="">
                  Terms
                </Link>
                <p className={styles.text}>,</p>
                <Link className={styles.link} to="">
                  Privacy
                </Link>
                <Link className={styles.link} to="">
                  Policy
                </Link>
                <p className={styles.text}>and</p>
                <Link className={styles.link} to="">
                  Cookies Policy
                </Link>
                <p className={styles.text}>.</p>
              </div>
            </div>
            <Button name="Sign up" type="submit" />
          </form>
        </div>
      </AuthContainer>
      <AuthLink text="Have an account?" linkText="Log in" linkPath="/login" />
    </main>
  );
}

export default AuthRegister;
