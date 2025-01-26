import styles from './styles.module.css';
import MainContainer from '../../components/mainContainer/index.tsx';

function Notifications() {
  return (
    <MainContainer>
      <div className={styles.notifications_container}>
        Notifications is in development...
      </div>
    </MainContainer>
  );
}

export default Notifications;
