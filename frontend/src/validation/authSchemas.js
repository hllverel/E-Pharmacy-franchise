import * as yup from 'yup';

const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .trim()
    .matches(phonePattern, 'Enter a valid phone number')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});