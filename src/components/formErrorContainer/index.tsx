import styles from './styles.module.css';
import { FieldErrors, FieldValues } from 'react-hook-form';

export interface IFormErrorContainerProps {
  errorList: FieldErrors<FieldValues>;
}

function FormErrorContainer({ errorList }: IFormErrorContainerProps) {
  return (
    <div className={styles.errors_container}>
      {Object.values(errorList).map((value, index) => (
        <p className={styles.error_text} key={index}>
          {value?.message as string}
        </p>
      ))}
    </div>
  );
}

export default FormErrorContainer;
