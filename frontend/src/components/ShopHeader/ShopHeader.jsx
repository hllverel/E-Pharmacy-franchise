import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './ShopHeader.module.css';

export default function ShopHeader({ shop, onAddMedicine }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{shop.name}</h1>

      <div className={styles.details}>
        <p className={styles.owner}>
          <span className={styles.ownerLabel}>Owner:</span> {shop.ownerName}
        </p>
        <p className={styles.info}>
          <Icon name="map-pin" className={styles.icon} />
          {shop.street}
        </p>
        <p className={styles.info}>
          <Icon name="phone" className={styles.icon} />
          {shop.phone}
        </p>
        <div className={styles.actions}>
          <Link to="/edit-shop" className={styles.edit}>
            Edit data
          </Link>
          <button type="button" className={styles.add} onClick={() => onAddMedicine?.()}>
            Add medicine
          </button>
        </div>
      </div>
    </div>
  );
}