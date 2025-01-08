import styles from './styles.module.css';
import { ReactNode } from 'react';

interface IAuthContainerProps {
  children: ReactNode
}

function AuthContainer({ children }: IAuthContainerProps) {
  return <div className={styles.auth_container}>
    {children}
  </div>;
}

export default AuthContainer;
