import { ReactNode } from 'react';
import styles from './styles.module.css';

interface IModalContainerProps {
  children: ReactNode;
  onClick: () => void;
  position?: string;
}

function ModalContainer({
  children,
  onClick,
  position = 'center',
}: IModalContainerProps) {
  return (
    <div
      className={`${styles.modal_container} ${
        position === 'left' && `${styles.modal_container_left}`
      } `}
      onClick={onClick}
    >
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
