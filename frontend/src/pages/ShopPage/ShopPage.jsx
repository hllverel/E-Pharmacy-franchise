import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ShopHeader from '../../components/ShopHeader/ShopHeader';
import Tabs from '../../components/Tabs/Tabs';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import AddProductModal from '../../components/AddProductModal/AddProductModal';
import EditProductModal from '../../components/EditProductModal/EditProductModal';
import DeleteProductModal from '../../components/DeleteProductModal/DeleteProductModal';
import { getShop } from '../../redux/shop/operations';
import { fetchProducts } from '../../redux/products/operations';
import { selectShop } from '../../redux/shop/selectors';
import { selectShopId } from '../../redux/auth/selectors';
import {
  selectProducts,
  selectCategories,
  selectProductsPage,
  selectTotalPages,
  selectIsProductsLoading,
} from '../../redux/products/selectors';
import { useAddToShop } from '../../hooks/useAddToShop';
import styles from './ShopPage.module.css';

const PRODUCTS_PER_PAGE = 12;

const TABS = [
  { id: 'store', label: 'Drug store' },
  { id: 'all', label: 'All medicine' },
];

export default function ShopPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useState(null);

  const shopId = useSelector(selectShopId);
  const shop = useSelector(selectShop);
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const currentPage = useSelector(selectProductsPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsProductsLoading);
  const { addProduct, pendingId } = useAddToShop();

  const tab = searchParams.get('tab') === 'all' ? 'all' : 'store';
  const category = searchParams.get('category') ?? '';
  const search = searchParams.get('search') ?? '';
  const page = Math.max(1, parseInt(searchParams.get('page'), 10) || 1);

  useEffect(() => {
    dispatch(getShop(shopId))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch, shopId]);

  const loadProducts = useCallback(() => {
    const params = {
      scope: tab === 'all' ? 'all' : 'shop',
      page,
      limit: PRODUCTS_PER_PAGE,
    };

    if (tab === 'all') {
      params.category = category;
      params.search = search;
    }

    return dispatch(fetchProducts({ shopId, params }))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch, shopId, tab, category, search, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const closeModal = () => setModal(null);

  const handleTabChange = (id) => {
    setSearchParams(id === 'all' ? { tab: 'all' } : {});
  };

  const handleFilter = ({ category: nextCategory, search: nextSearch }) => {
    const next = { tab: 'all' };
    if (nextCategory) next.category = nextCategory;
    if (nextSearch) next.search = nextSearch;
    setSearchParams(next);
  };

  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    if (nextPage > 1) {
      next.set('page', String(nextPage));
    } else {
      next.delete('page');
    }
    setSearchParams(next);
    window.scrollTo(0, 0);
  };

  const handleProductAdded = () => {
    if (tab === 'store' && page === 1) {
      loadProducts();
    } else {
      setSearchParams({});
    }
  };

  const handleProductRemoved = () => {
    if (products.length === 1 && page > 1) {
      handlePageChange(page - 1);
    } else {
      loadProducts();
    }
  };

  const handleAddToShop = async (product) => {
  const isAdded = await addProduct(product._id);
  if (isAdded) {
    handleProductRemoved();
  }
};

  const isShopReady = shop && shop._id === shopId;

  return (
    <div className={styles.page}>
      {isShopReady && (
        <ShopHeader shop={shop} onAddMedicine={() => setModal({ type: 'add' })} />
      )}
      <Tabs tabs={TABS} activeTab={tab} onChange={handleTabChange} label="Medicine lists" />

      {tab === 'all' && (
        <FilterPanel
          key={`${category}|${search}`}
          categories={categories}
          initialCategory={category}
          initialSearch={search}
          onFilter={handleFilter}
        />
      )}

<ProductList
  products={products}
  variant={tab === 'all' ? 'catalogue' : 'store'}
  isLoading={isLoading}
  pendingProductId={pendingId}
  onEdit={(product) => setModal({ type: 'edit', product })}
  onDelete={(product) => setModal({ type: 'delete', product })}
  onAddToShop={handleAddToShop}
/>

      <Pagination page={currentPage} totalPages={totalPages} onChange={handlePageChange} />

      {modal?.type === 'add' && (
        <AddProductModal shopId={shopId} onClose={closeModal} onSuccess={handleProductAdded} />
      )}
      {modal?.type === 'edit' && (
        <EditProductModal
          shopId={shopId}
          product={modal.product}
          onClose={closeModal}
          onSuccess={loadProducts}
        />
      )}
      {modal?.type === 'delete' && (
        <DeleteProductModal
          shopId={shopId}
          product={modal.product}
          onClose={closeModal}
          onSuccess={handleProductRemoved}
        />
      )}
    </div>
  );
}