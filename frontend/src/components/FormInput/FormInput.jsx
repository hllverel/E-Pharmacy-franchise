import { useId } from 'react';
import styles from './FormInput.module.css';

export default function FormInput({label, error, registration, multiline = false, ...inputProps}) {
  const id = useId();
  const errorId = `${id}-error`;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <Control
        id={id}
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        aria-label={label ? undefined : inputProps.placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
        {...registration}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error.message}
        </p>
      )}
    </div>
  );
}