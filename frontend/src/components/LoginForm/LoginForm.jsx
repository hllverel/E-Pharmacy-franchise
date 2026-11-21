import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormInput from '../FormInput/FormInput';
import { login } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';
import { loginSchema } from '../../validation/authSchemas';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.fields}>
        <FormInput
          type="email"
          placeholder="Email address"
          autoComplete="email"
          error={errors.email}
          registration={register('email')}
        />
        <FormInput
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          error={errors.password}
          registration={register('password')}
        />
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        Log in
      </button>
      <Link to="/register" className={styles.link}>
        Don't have an account?
      </Link>
    </form>
  );
}