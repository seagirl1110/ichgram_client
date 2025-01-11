import styles from './styles.module.css';
import { ReactNode } from 'react';
import logo from './../../assets/icons/logo_big.png';

interface IAuthContainerProps {
  children: ReactNode;
}

function AuthContainer({ children }: IAuthContainerProps) {
  return (
    <div className={styles.auth_container}>
      <img src={logo} alt="ICH" />
      {children}
    </div>
  );
}

export default AuthContainer;
