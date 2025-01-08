import styles from './styles.module.css';


interface IButtonProps {
    name: string;
    onClick: () => void
}

function Button({ name, onClick }: IButtonProps) {

    return (
        <button onClick={onClick} className={styles.btn}>{name}</button>
    )
}

export default Button;