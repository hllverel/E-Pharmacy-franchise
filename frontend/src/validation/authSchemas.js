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

const shopFields = {
  name: yup
    .string()
    .trim()
    .min(2, 'Shop name must be at least 2 characters')
    .max(60, 'Shop name must be at most 60 characters')
    .required('Shop name is required'),
  ownerName: yup
    .string()
    .trim()
    .min(2, 'Owner name must be at least 2 characters')
    .max(60, 'Owner name must be at most 60 characters')
    .required('Owner name is required'),
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
  street: yup
    .string()
    .trim()
    .min(2, 'Street address must be at least 2 characters')
    .max(100, 'Street address must be at most 100 characters')
    .required('Street address is required'),
  city: yup
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(60, 'City must be at most 60 characters')
    .required('City is required'),
  zip: yup
    .string()
    .trim()
    .min(3, 'Zip code must be at least 3 characters')
    .max(12, 'Zip code must be at most 12 characters')
    .required('Zip code is required'),
  hasOwnDelivery: yup.string().oneOf(['true', 'false']).required(),
};

export const createShopSchema = yup.object({
  ...shopFields,
  password: yup.string().required('Password is required'),
});