import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectShopId } from '../redux/auth/selectors';

export default function PrivateRoute({ children, requireShop = true }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const shopId = useSelector(selectShopId);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requireShop && !shopId) {
    return <Navigate to="/create-shop" replace />;
  }

  return children;
}