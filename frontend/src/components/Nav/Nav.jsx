import { Link } from 'react-router-dom';
import { useNavLinks } from '../../hooks/useNavLinks';
import styles from './Nav.module.css';

export default function Nav({ onNavigate }) {
  const links = useNavLinks();

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