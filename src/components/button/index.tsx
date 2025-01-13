import styles from './styles.module.css';

interface IButtonProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  secondary?: true;
}

function Button({ name, type = 'button', onClick, secondary }: IButtonProps) {
  return (
    <button type={type} onClick={onClick} className={styles.btn}>
      {name}
    </button>
  );
}

export default Button;
