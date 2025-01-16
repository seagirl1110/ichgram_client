import styles from './styles.module.css';
import MainContainer from '../../components/mainContainer';

function Home() {
  return (
    <MainContainer>
      <div className={styles.home_container}></div>
    </MainContainer>
  );
}

export default Home;
