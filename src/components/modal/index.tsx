import { ReactNode } from 'react';
import styles from './styles.module.css';

interface IModalContainerProps {
  children: ReactNode;
  onClick: () => void;
}

function ModalContainer({ children, onClick }: IModalContainerProps) {
  return (
    <div className={styles.modal_container} onClick={onClick}>
      <div
        className={styles.modal_inner}
        onClick={(evt) => evt.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
