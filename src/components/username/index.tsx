import styles from './styles.module.css';

interface IUsernameProps {
  name: string;
}

function Username({ name }: IUsernameProps) {
  return <span className={styles.username}>{name}</span>;
}

export default Username;
