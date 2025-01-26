import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

interface IUsernameProps {
  name: string;
  id: string;
}

function Username({ name, id }: IUsernameProps) {
  const navigate = useNavigate();

  return (
    <span
      className={styles.username}
      onClick={() => navigate(`/profile/${id}`)}
    >
      {name}
    </span>
  );
}

export default Username;
