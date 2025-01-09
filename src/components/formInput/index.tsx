import styles from './styles.module.css';
import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface IFormInputData {
  type: string;
  placeholder: string;
  name: string;
}

export interface IFormInputProps extends IFormInputData {
  register: UseFormRegister<FieldValues>;
}

function FormInput({ type, placeholder, name, register }: IFormInputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
  );
}

export default FormInput;
