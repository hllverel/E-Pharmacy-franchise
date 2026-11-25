import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ProductOverview from '../../components/ProductOverview/ProductOverview';
import Tabs from '../../components/Tabs/Tabs';
import DescriptionTab from '../../components/DescriptionTab/DescriptionTab';
import ReviewsTab from '../../components/ReviewsTab/ReviewsTab';
import { getProductRequest } from '../../api/medicine';
import { useAddToShop } from '../../hooks/useAddToShop';
import { selectShopId } from '../../redux/auth/selectors';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './MedicinePage.module.css';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'reviews', label: 'Reviews' },
];

function MedicineContent({ shopId, productId }) {
  const { addProduct, pendingId } = useAddToShop();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [tab, setTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    getProductRequest(shopId, productId)
      .then((result) => {
        if (isCancelled) return;
        setProduct(result);
        setStatus('ready');
      })
      .catch((error) => {
        if (isCancelled) return;
        toast.error(getErrorMessage(error));
        setStatus('error');
      });

    return () => {
      isCancelled = true;
    };
  }, [shopId, productId]);

  const handleAddToShop = async () => {
    const isSuccess = await addProduct(product._id);
    if (isSuccess) {
      setIsAdded(true);
    }
  };

  if (status === 'loading') {
    return (
      <p className={styles.message} role="status">
        Loading...
      </p>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.message}>
        <p>Medicine not found.</p>
        <Link to="/shop" className={styles.backLink}>
          Back to the shop
        </Link>
      </div>
    );
  }

  const isOwnProduct = product.shop === shopId;

  return (
    <div className={styles.page}>
      <ProductOverview
        product={product}
        canAdd={!isOwnProduct}
        isAdding={pendingId === product._id}
        isAdded={isAdded}
        onAddToShop={handleAddToShop}
      />

      <div className={styles.panel}>
        <Tabs
          tabs={TABS}
          activeTab={tab}
          onChange={setTab}
          label="Medicine information"
          variant="pill"
        />
        {tab === 'description' ? (
          <DescriptionTab description={product.description} />
        ) : (
          <ReviewsTab shopId={shopId} productId={product._id} />
        )}
      </div>
    </div>
  );
}

export default function MedicinePage() {
  const { productId } = useParams();
  const shopId = useSelector(selectShopId);

  return (
    <MedicineContent
      key={`${shopId}:${productId}`}
      shopId={shopId}
      productId={productId}
    />
  );
}