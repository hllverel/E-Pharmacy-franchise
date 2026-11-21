import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShopFormLayout from '../../components/ShopFormLayout/ShopFormLayout';
import CreateShopForm from '../../components/CreateShopForm/CreateShopForm';
import { selectShopId } from '../../redux/auth/selectors';

export default function CreateShopPage() {
  const shopId = useSelector(selectShopId);

  if (shopId) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <ShopFormLayout title="Create your Shop">
      <CreateShopForm />
    </ShopFormLayout>
  );
}