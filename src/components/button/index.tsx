import styles from './styles.module.css';

interface IButtonProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  typeStyle?: 'primary' | 'secondary' | 'text';
  minWidth?: number;
}

function Button({
  name,
  type = 'button',
  onClick,
  typeStyle = 'primary',
  minWidth,
}: IButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn_${typeStyle}`]}`}
      style={{ minWidth }}
    >
      {name}
    </button>
  );
}

export default Button;
