import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ShopFields from '../ShopFields/ShopFields';
import DeliveryRadios from '../DeliveryRadios/DeliveryRadios';
import { updateShop } from '../../redux/shop/operations';
import { selectIsShopLoading } from '../../redux/shop/selectors';
import { editShopSchema } from '../../validation/shopSchemas';
import styles from './EditShopForm.module.css';

export default function EditShopForm({ shop }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsShopLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editShopSchema),
    defaultValues: {
      name: shop.name,
      ownerName: shop.ownerName,
      email: shop.email,
      phone: shop.phone,
      street: shop.street,
      city: shop.city,
      zip: shop.zip,
      hasOwnDelivery: String(shop.hasOwnDelivery),
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      hasOwnDelivery: values.hasOwnDelivery === 'true',
    };

    try {
      await dispatch(updateShop({ shopId: shop._id, values: payload })).unwrap();
      toast.success('Shop updated successfully');
      navigate('/shop');
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.grid}>
        <ShopFields register={register} errors={errors} />
      </div>

      <DeliveryRadios register={register} />

      <button type="submit" className={styles.button} disabled={isLoading}>
        Save
      </button>
    </form>
  );
}