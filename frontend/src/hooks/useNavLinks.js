import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectShopId } from '../redux/auth/selectors';

export const useNavLinks = () => {
  const { pathname } = useLocation();
  const shopId = useSelector(selectShopId);

  return [
    {
      to: shopId ? '/edit-shop' : '/create-shop',
      label: 'Shop',
      isActive: pathname === '/create-shop' || pathname === '/edit-shop',
    },
    {
      to: '/shop',
      label: 'Medicine',
      isActive: pathname === '/shop' || pathname.startsWith('/medicine'),
    },
    {
      to: '/statistics',
      label: 'Statistics',
      isActive: pathname.startsWith('/statistics'),
    },
  ];
};