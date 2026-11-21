import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav({ onNavigate }) {
  const { pathname, search } = useLocation();
  const isAllMedicine = new URLSearchParams(search).get('tab') === 'all';

  const links = [
    {
      to: '/shop',
      label: 'Shop',
      isActive: pathname === '/shop' && !isAllMedicine,
    },
    {
      to: '/shop?tab=all',
      label: 'Medicine',
      isActive:
        (pathname === '/shop' && isAllMedicine) ||
        pathname.startsWith('/medicine'),
    },
    {
      to: '/statistics',
      label: 'Statistics',
      isActive: pathname.startsWith('/statistics'),
    },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className={styles.list}>
        {links.map(({ to, label, isActive }) => (
          <li key={label}>
            <Link
              to={to}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={onNavigate}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}