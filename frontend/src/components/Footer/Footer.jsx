import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import styles from './Footer.module.css';

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/goITclub/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/goitclub/', icon: 'instagram' },
  { name: 'YouTube', href: 'https://www.youtube.com/c/GoIT', icon: 'youtube' },
];

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?tab=all', label: 'Medicine' },
  { to: '/statistics', label: 'Statistics' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Logo light />
        <p className={styles.text}>
          Get the medicine to help you feel better, get back to your active
          life, and enjoy every moment.
        </p>
        <ul className={styles.social}>
          {socialLinks.map(({ name, href, icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={styles.socialLink}
              >
                <Icon name={icon} className={styles.socialIcon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav aria-label="Footer navigation">
        <ul className={styles.navList}>
          {navLinks.map(({ to, label }) => (
            <li key={label}>
              <Link to={to} className={styles.navLink}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.bottom}>
        <p className={styles.copyright}>© E-Pharmacy 2023. All Rights Reserved</p>
        <ul className={styles.legal}>
          <li>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
          </li>
          <li>
            <a href="#" className={styles.legalLink}>Terms & Conditions</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}