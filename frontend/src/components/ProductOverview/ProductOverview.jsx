import placeholder from '../../assets/images/product-placeholder.webp';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductOverview.module.css';

export default function ProductOverview({
  product,
  canAdd,
  isAdding,
  isAdded,
  onAddToShop,
}) {
  return (
    <div className={styles.overview}>
      <div className={styles.imageBox}>
        <img
          src={product.photo || placeholder}
          alt={product.name}
          width="364"
          height="336"
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
        {product.suppliers && (
          <p className={styles.brand}>Brand: {product.suppliers}</p>
        )}
        {canAdd && (
          <button
            type="button"
            className={styles.button}
            onClick={onAddToShop}
            disabled={isAdding || isAdded}
          >
            {isAdded ? 'Added to shop' : 'Add to shop'}
          </button>
        )}
      </div>
    </div>
  );
}