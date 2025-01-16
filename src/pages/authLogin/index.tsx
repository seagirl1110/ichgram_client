import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from './../../config/index';
import AuthContainer from '../../components/authContainer';
import AuthLink from '../../components/authLink';
import Button from '../../components/button';
import FormInputContainer from '../../components/formInputContainer';
import { IFormInputData } from '../../components/formInput';
import FormErrorContainer from '../../components/formErrorContainer';
import image from './../../assets/images/auth-login-page.png';

function AuthLogin() {
  const inputList: IFormInputData[] = [
    {
      type: 'text',
      placeholder: 'Username, or email',
      name: 'login',
      validation: {
        required: 'Full name is required',
      },
    },
    {
      type: 'text',
      placeholder: 'Password',
      name: 'password',
      validation: {
        required: 'Password is required',
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
      const response = await axios.post(`${BASE_URL}/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token } = response.data.data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data.message;
        if (errMsg === 'Invalid credentials') {
          setError('login', {
            type: 'manual',
            message: 'Invalid login or password.',
          });
          setError('password', {
            type: 'manual',
            message: 'Invalid password or login.',
          });
        }
      }
    }
  };

  return (
    <main className={styles.auth_login_container}>
      <img className={styles.image} src={image} alt="ichgram_image" />
      <div className={styles.login_wrapper}>
        <AuthContainer>
          <div className={styles.login_info_container}>
            <form
              className={styles.form_container}
              onSubmit={handleSubmit(onSubmitForm)}
            >
              <FormInputContainer inputList={inputList} register={register} />
              {Object.keys(errors).length > 0 && (
                <FormErrorContainer errorList={errors} />
              )}
              <Button name="Log in" type="submit" />
            </form>
            <div className={styles.divider_container}>
              <div className={styles.divider}></div>
              <div className={styles.divider_text}>OR</div>
              <div className={styles.divider}></div>
            </div>
            <Link className={styles.link} to="">
              Forgot password?
            </Link>
          </div>
        </AuthContainer>
        <AuthLink
          text="Don't have an account?"
          linkText="Sign up"
          linkPath="/register"
        />
      </div>
    </main>
  );
}

export default AuthLogin;
