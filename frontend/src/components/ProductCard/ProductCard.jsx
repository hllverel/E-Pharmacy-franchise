import { Link } from 'react-router-dom';
import placeholder from '../../assets/images/product-placeholder.webp';
import placeholder2x from '../../assets/images/product-placeholder@2x.webp';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, variant, isPending, onEdit, onDelete, onAddToShop }) {
  return (
    <li className={styles.card}>
      <div className={styles.imageBox}>
        {/* <img
          src={product.photo || placeholder}
          srcSet={`product.photo || ${placeholder} 1x, product.photo || ${placeholder2x} 2x`}
          alt={product.name}
          width="280"
          height="280"
          loading="lazy"
          className={styles.image}
        /> */}
        <img
  src={product.photo || placeholder}
  srcSet={
    product.photo
      ? undefined
      : `${placeholder} 1x, ${placeholder2x} 2x`
  }
  alt={product.name}
  width="280"
  height="280"
  loading="lazy"
  className={styles.image}
/>
      </div>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <p className={styles.name}>{product.name}</p>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
        {product.suppliers && <p className={styles.supplier}>{product.suppliers}</p>}
        <div className={styles.actions}>
          {variant === 'store' ? (
            <>
              <button type="button" className={styles.primary} onClick={() => onEdit?.(product)}>
                Edit
              </button>
              <button type="button" className={styles.secondary} onClick={() => onDelete?.(product)}>
                Delete
              </button>
            </>
          ) : (
            <>
<button
  type="button"
  className={styles.primary}
  onClick={() => onAddToShop?.(product)}
  disabled={isPending}
>
  Add to shop
</button>
              <Link to={`/medicine/${product._id}`} className={styles.details}>
                Details
              </Link>
            </>
          )}
        </div>
      </div>
    </li>
  );
}