import styles from './styles.module.css';
import MainContainer from '../../components/mainContainer/index.tsx';

function Messages() {
  return (
    <MainContainer>
      <div className={styles.messages_container}>
        Messages is in development...
      </div>
    </MainContainer>
  );
}

export default Messages;
