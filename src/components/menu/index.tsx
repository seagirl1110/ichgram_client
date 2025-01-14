import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/icons/logo_small.png';
import homeIcons from './../../assets/icons/menu_home.svg';
import searchIcons from './../../assets/icons/menu_search.svg';
import exploreIcons from './../../assets/icons/menu_explore.svg';
import messagesIcons from './../../assets/icons/menu_messages.svg';
import notificationsIcons from './../../assets/icons/menu_notifications.svg';
import createIcons from './../../assets/icons/menu_create.svg';
import profileIcons from './../../assets/icons/menu_profile.svg';

interface IMenuProps {
  menuList: string[];
}

const icons: Record<string, string> = {
  Home: homeIcons,
  Search: searchIcons,
  Explore: exploreIcons,
  Messages: messagesIcons,
  Notifications: notificationsIcons,
  Create: createIcons,
};

function Menu({ menuList }: IMenuProps) {
  return (
    <aside className={styles.menu_container}>
      <img src={logo} alt="ICHGRAM" className={styles.logo} />
      <nav className={styles.menu_list}>
        {menuList.map((item, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.nav_link} ${styles.nav_link_active}`
                : `${styles.nav_link}`
            }
            key={index}
            to={`/${item.toLowerCase()}`}
          >
            <img src={icons[item]} alt="icons" className={styles.link_icon} />
            <span className={styles.link_text}>{item}</span>
          </NavLink>
        ))}
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.nav_link} ${styles.nav_link_active}`
              : `${styles.nav_link}`
          }
          to="/profile"
        >
          <img src={profileIcons} alt="icons" className={styles.link_icon} />
          <span className={styles.link_text}>Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Menu;
