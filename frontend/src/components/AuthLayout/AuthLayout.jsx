import pill from '../../assets/images/pill.webp';
import pill2x from '../../assets/images/pill@2x.webp';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children }) {
  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Your medication, delivered Say goodbye to all{' '}
          <span className={styles.accent}>your healthcare</span> worries with us
        </h1>
        <img
          src={pill}
          srcSet={`${pill} 1x, ${pill2x} 2x`}
          alt=""
          width="180"
          height="180"
          className={styles.pill}
        />
      </div>
      <div className={styles.formWrap}>{children}</div>
    </section>
  );
}