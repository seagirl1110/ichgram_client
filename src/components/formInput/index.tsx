import styles from './styles.module.css';
import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface IFormInputData {
  type: string;
  placeholder: string;
  name: string;
  validation: object;
}

export interface IFormInputProps extends IFormInputData {
  register: UseFormRegister<FieldValues>;
}

function FormInput({
  type,
  placeholder,
  name,
  validation,
  register,
}: IFormInputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      {...register(name, validation)}
    />
  );
}

export default FormInput;
