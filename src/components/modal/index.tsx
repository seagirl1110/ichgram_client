import { ReactNode } from 'react';
import styles from './styles.module.css';

interface IModalContainerProps {
  children: ReactNode;
}

function ModalContainer({ children }: IModalContainerProps) {
  return <div className={styles.modal_container}>{children}</div>;
}

export default ModalContainer;
