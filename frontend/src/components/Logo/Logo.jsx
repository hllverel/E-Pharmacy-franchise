import { Link } from 'react-router-dom';
import logoGreen from '../../assets/images/logo-green.png';
import logoGreen2x from '../../assets/images/logo-green@2x.png';
import logoWhite from '../../assets/images/logo-white.png';
import logoWhite2x from '../../assets/images/logo-white@2x.png';
import styles from './Logo.module.css';

export default function Logo({ light = false }) {
  const src = light ? logoWhite : logoGreen;
  const src2x = light ? logoWhite2x : logoGreen2x;

  return (
    <Link to="/" className={`${styles.logo} ${light ? styles.light : ''}`}>
      <img
        src={src}
        srcSet={`${src} 1x, ${src2x} 2x`}
        alt=""
        className={styles.icon}
      />
      <span className={styles.text}>E-Pharmacy</span>
    </Link>
  );
}