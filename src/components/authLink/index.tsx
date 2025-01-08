import styles from './styles.module.css';
import { Link } from 'react-router-dom';

interface IAuthLinkProps {
  text: string,
  linkText: string,
  linkPath: string
}

function AuthLink({ text, linkText, linkPath }: IAuthLinkProps) {
  return <div className={styles.auth_link_container}>
    <div className={styles.text}>{text}</div>
    <Link to={linkPath} className={styles.text_link}>{linkText}</Link>
  </div>;
}

export default AuthLink;
