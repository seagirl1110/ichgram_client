import styles from './styles.module.css';
import FormInput from '../formInput';
import { IFormInputData } from '../formInput';
import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface IFormInputContainerProps {
  inputList: IFormInputData[];
  register: UseFormRegister<FieldValues>;
}

function FormInputContainer({ inputList, register }: IFormInputContainerProps) {
  return (
    <div className={styles.input_list_container}>
      {inputList.map((item, index) => (
        <FormInput
          key={index}
          type={item.type}
          placeholder={item.placeholder}
          name={item.name}
          validation={item.validation}
          register={register}
        />
      ))}
    </div>
  );
}

export default FormInputContainer;
