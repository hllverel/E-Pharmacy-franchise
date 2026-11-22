import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ShopFormLayout from '../../components/ShopFormLayout/ShopFormLayout';
import EditShopForm from '../../components/EditShopForm/EditShopForm';
import { getShop } from '../../redux/shop/operations';
import { selectShop } from '../../redux/shop/selectors';
import { selectShopId } from '../../redux/auth/selectors';

export default function EditShopPage() {
  const dispatch = useDispatch();
  const shopId = useSelector(selectShopId);
  const shop = useSelector(selectShop);

  useEffect(() => {
    dispatch(getShop(shopId))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch, shopId]);

  const isReady = shop && shop._id === shopId;

  return (
    <ShopFormLayout title="Edit data">
      {isReady && <EditShopForm key={shop.updatedAt} shop={shop} />}
    </ShopFormLayout>
  );
}