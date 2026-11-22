import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList({
  products,
  variant,
  isLoading,
  onEdit,
  onDelete,
  onAddToShop,
}) {
  if (isLoading) {
    return (
      <p className={styles.message} role="status">
        Loading...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className={styles.message}>
        {variant === 'store'
          ? 'Your drug store is empty. Add medicine to get started.'
          : 'No medicine found.'}
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          variant={variant}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToShop={onAddToShop}
        />
      ))}
    </ul>
  );
}