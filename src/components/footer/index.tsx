import styles from './styles.module.css';
import { Link } from 'react-router-dom';

interface IFooterProps {
  menuList: string[];
}

function Footer({ menuList }: IFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.link_container}>
        {menuList.map((item, index) => (
          <Link
            className={styles.link}
            key={index}
            to={`/${item.toLowerCase()}`}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className={styles.copyright}>© 2025 ICHgram</div>
    </footer>
  );
}

export default Footer;
