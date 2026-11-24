import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import FormInput from '../FormInput/FormInput';
import Icon from '../Icon/Icon';
import placeholder from '../../assets/images/product-placeholder.webp';
import { productSchema } from '../../validation/productSchemas';
import { getImageError } from '../../utils/getImageError';
import styles from './ProductForm.module.css';

export default function ProductForm({
  product,
  imageLabel,
  submitLabel,
  isLoading,
  onSubmit,
  onCancel,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      price: product ? String(product.price) : '',
      description: product?.description ?? '',
    },
  });

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage.url);
      }
    };
  }, [selectedImage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const message = getImageError(file);
    if (message) {
      toast.error(message);
      event.target.value = '';
      return;
    }

    setSelectedImage({ file, url: URL.createObjectURL(file) });
  };

  const submit = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('description', values.description ?? '');
    if (selectedImage) {
      formData.append('photo', selectedImage.file);
    }
    onSubmit(formData);
  };

  const previewSrc = selectedImage?.url ?? product?.photo ?? placeholder;

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      <div className={styles.imageBox}>
        <img src={previewSrc} alt="" className={styles.image} />
      </div>

      <label className={styles.upload}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className={styles.fileInput}
          onChange={handleImageChange}
        />
        <Icon name="paperclip" className={styles.uploadIcon} />
        <span className={styles.uploadText}>{imageLabel}</span>
      </label>

      <div className={styles.fields}>
        <FormInput
          label="Medicine Name"
          placeholder="Enter text"
          error={errors.name}
          registration={register('name')}
        />
        <FormInput
          label="Price"
          placeholder="Enter text"
          inputMode="decimal"
          error={errors.price}
          registration={register('price')}
        />
        <div className={styles.description}>
          <FormInput
            label="Description"
            placeholder="Enter text"
            multiline
            error={errors.description}
            registration={register('description')}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={isLoading}>
          {submitLabel}
        </button>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}