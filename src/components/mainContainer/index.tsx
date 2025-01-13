import styles from './styles.module.css';
import { ReactNode } from 'react';
import Footer from '../footer';
import Menu from '../menu';

const menuList: string[] = [
  'Home',
  'Search',
  'Explore',
  'Messages',
  'Notifications',
  'Create',
];

interface IMainContainerProps {
  children: ReactNode;
}

function MainContainer({ children }: IMainContainerProps) {
  return (
    <div className={styles.main_container}>
      <div className={styles.main_inner}>
        <Menu menuList={menuList} />
        {children}
      </div>
      <Footer menuList={menuList} />
    </div>
  );
}

export default MainContainer;
