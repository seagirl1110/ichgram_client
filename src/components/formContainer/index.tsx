import styles from './styles.module.css';
import FormInput from '../formInput';
import { IFormInputData } from '../formInput';
import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface IFormContainerProps {
  inputList: IFormInputData[];
  register: UseFormRegister<FieldValues>;
}

function FormContainer({ inputList, register }: IFormContainerProps) {
  return (
    <form className={styles.form}>
      {inputList.map((item, index) => (
        <FormInput
          key={index}
          type={item.type}
          placeholder={item.placeholder}
          name={item.name}
          register={register}
        />
      ))}
    </form>
  );
}

export default FormContainer;
