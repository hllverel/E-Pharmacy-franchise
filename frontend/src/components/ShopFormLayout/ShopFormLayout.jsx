import photo from '../../assets/images/shop-photo.webp';
import photo2x from '../../assets/images/shop-photo@2x.webp';
import styles from './ShopFormLayout.module.css';

export default function ShopFormLayout({ title, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>
          This information will be displayed publicly so be careful what you
          share.
        </p>
        {children}
      </div>
      
      <img
        src={photo}
        srcSet={`${photo} 1x, ${photo2x} 2x`}
        alt="image of medicine"
        loading="lazy"
        className={styles.photo}
      />
    </section>
  );
}