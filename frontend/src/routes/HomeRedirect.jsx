import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectShopId } from '../redux/auth/selectors';

export default function HomeRedirect() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const shopId = useSelector(selectShopId);

  if (!isLoggedIn) {
    return <Navigate to="/register" replace />;
  }

  return <Navigate to={shopId ? '/shop' : '/create-shop'} replace />;
}