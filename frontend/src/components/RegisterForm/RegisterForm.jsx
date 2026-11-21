import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormInput from '../FormInput/FormInput';
import { register as registerUser } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';
import { registerSchema } from '../../validation/authSchemas';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', phone: '', password: '' },
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success('Registration successful. Please log in.');
      navigate('/login');
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.fields}>
        <FormInput
          type="text"
          placeholder="User Name"
          autoComplete="name"
          error={errors.name}
          registration={register('name')}
        />
        <FormInput
          type="email"
          placeholder="Email address"
          autoComplete="email"
          error={errors.email}
          registration={register('email')}
        />
        <FormInput
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
          error={errors.phone}
          registration={register('phone')}
        />
        <FormInput
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          error={errors.password}
          registration={register('password')}
        />
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        Register
      </button>
      <Link to="/login" className={styles.link}>
        Already have an account?
      </Link>
    </form>
  );
}