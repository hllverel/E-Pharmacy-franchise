import photo from '../../assets/images/shop-photo.webp';
import photo2x from '../../assets/images/shop-photo@2x.webp';
import styles from './ShopFormLayout.module.css';

export default function ShopFormLayout({ title, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>
          This information will be displayed publicly so be careful what you
          share.
        </p>
        {children}
      </div>
      <img
        src={photo}
        srcSet={`${photo} 1x, ${photo2x} 2x`}
        alt=""
        width="456"
        height="624"
        loading="lazy"
        className={styles.photo}
      />
    </section>
  );
}