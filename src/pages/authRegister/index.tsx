import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import logo from './../../assets/icons/logo_big.png';
import AuthContainer from '../../components/authContainer';
import AuthLink from '../../components/authLink';
import Button from '../../components/button';

function AuthRegister() {
  return <main className={styles.auth_register_container}>
    <AuthContainer>
      <img src={logo} alt="ICH" />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Sign up to see photos and videos from your friends.</h1>
        <div className={styles.text_wrapper}>
          <div className={styles.text_container}>
            <p className={styles.text}>People who use our service may have uploaded</p>
            <p className={styles.text}> your contact information to Instagram.</p>
            <Link className={styles.link} to=''>Learn More</Link>
          </div>
          <div className={styles.text_container}>
            <p className={styles.text}>By signing up, you agree to our</p>
            <Link className={styles.link} to=''>Terms</Link>
            <p className={styles.text}>,</p>
            <Link className={styles.link} to=''>Privacy</Link>
            <Link className={styles.link} to=''>Policy</Link>
            <p className={styles.text}>and</p>
            <Link className={styles.link} to=''>Cookies Policy</Link>
            <p className={styles.text}>.</p>
          </div>
        </div>
        <Button name='Sign up' onClick={() => { }} />
      </div>
    </AuthContainer>
    <AuthLink text='Have an account?' linkText='Log in' linkPath='/login' />
  </main>;
}

export default AuthRegister;
