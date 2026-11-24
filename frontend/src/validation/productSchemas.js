import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .required('Medicine name is required'),
  price: yup
    .number()
    .transform((value, original) => (original === '' ? undefined : value))
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  description: yup
    .string()
    .trim()
    .max(2000, 'Description must be at most 2000 characters'),
});