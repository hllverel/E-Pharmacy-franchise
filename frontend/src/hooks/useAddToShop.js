import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToShop } from '../redux/products/operations';
import { selectShopId } from '../redux/auth/selectors';

export const useAddToShop = () => {
  const dispatch = useDispatch();
  const shopId = useSelector(selectShopId);
  const [pendingId, setPendingId] = useState(null);

  const addProduct = async (productId) => {
    setPendingId(productId);
    try {
      await dispatch(addToShop({ shopId, productId })).unwrap();
      toast.success('Medicine added to your shop');
      return true;
    } catch (message) {
      toast.error(message);
      return false;
    } finally {
      setPendingId(null);
    }
  };

  return { addProduct, pendingId };
};