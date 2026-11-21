import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FormInput from '../FormInput/FormInput';
import ShopFields from '../ShopFields/ShopFields';
import DeliveryRadios from '../DeliveryRadios/DeliveryRadios';
import Icon from '../Icon/Icon';
import { createShop } from '../../redux/shop/operations';
import { selectIsShopLoading } from '../../redux/shop/selectors';
import { createShopSchema } from '../../validation/authSchemas';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../../constants/upload';
import styles from './CreateShopForm.module.css';

export default function CreateShopForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsShopLoading);
  const [logo, setLogo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createShopSchema),
    defaultValues: {
      name: '',
      ownerName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      zip: '',
      hasOwnDelivery: 'true',
      password: '',
    },
  });

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setLogo(null);
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Only JPEG, PNG or WebP images are allowed');
      event.target.value = '';
      setLogo(null);
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('The image must be 2 MB or smaller');
      event.target.value = '';
      setLogo(null);
      return;
    }

    setLogo(file);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      await dispatch(createShop(formData)).unwrap();
      toast.success('Shop created successfully');
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.grid}>
        <ShopFields register={register} errors={errors} />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter text"
          autoComplete="current-password"
          error={errors.password}
          registration={register('password')}
        />
      </div>

      <DeliveryRadios register={register} />

      <div className={styles.upload}>
        <label className={styles.uploadLabel}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={styles.fileInput}
            onChange={handleLogoChange}
          />
          <Icon name="paperclip" className={styles.uploadIcon} />
          <span className={styles.uploadText}>Upload logo</span>
        </label>
        {logo && <span className={styles.fileName}>{logo.name}</span>}
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        Create account
      </button>
    </form>
  );
}