import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ShopHeader from '../../components/ShopHeader/ShopHeader';
import Tabs from '../../components/Tabs/Tabs';
import ProductList from '../../components/ProductList/ProductList';
import { getShop } from '../../redux/shop/operations';
import { fetchProducts } from '../../redux/products/operations';
import { selectShop } from '../../redux/shop/selectors';
import { selectShopId } from '../../redux/auth/selectors';
import { selectProducts, selectIsProductsLoading } from '../../redux/products/selectors';
import styles from './ShopPage.module.css';

const TABS = [
  { id: 'store', label: 'Drug store' },
  { id: 'all', label: 'All medicine' },
];

export default function ShopPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const shopId = useSelector(selectShopId);
  const shop = useSelector(selectShop);
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsProductsLoading);

  const tab = searchParams.get('tab') === 'all' ? 'all' : 'store';

  useEffect(() => {
    dispatch(getShop(shopId))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch, shopId]);

  useEffect(() => {
    dispatch(fetchProducts({ shopId, params: { scope: tab === 'all' ? 'all' : 'shop' } }))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch, shopId, tab]);

  const handleTabChange = (id) => {
    setSearchParams(id === 'all' ? { tab: 'all' } : {});
  };

  const isShopReady = shop && shop._id === shopId;

  return (
    <div className={styles.page}>
      {isShopReady && <ShopHeader shop={shop} />}
      <Tabs tabs={TABS} activeTab={tab} onChange={handleTabChange} label="Medicine lists" />
      <ProductList
        products={products}
        variant={tab === 'all' ? 'catalogue' : 'store'}
        isLoading={isLoading}
      />
    </div>
  );
}