import styles from './styles.module.css';
import image from './../../assets/images/auth-login-page.png';
import MainContainer from '../../components/mainContainer';

function NotFound() {
  return (
    <MainContainer>
      <div className={styles.page_container}>
        <img className={styles.image} src={image} alt="ichgram_image" />
        <div className={styles.info_container}>
          <div className={styles.title}>Oops! Page Not Found (404 Error)</div>
          <div className={styles.text}>
            We're sorry, but the page you're looking for doesn't seem to exist.
            If you typed the URL manually, please double-check the spelling. If
            you clicked on a link, it may be outdated or broken.
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default NotFound;
