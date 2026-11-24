import { useEffect } from 'react';
import Icon from '../Icon/Icon';
import Nav from '../Nav/Nav';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ isOpen, onClose, onLogout }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <aside className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close menu"
        >
          <Icon name="close" className={styles.closeIcon} />
        </button>
        <Nav onNavigate={onClose} />
        <button type="button" className={styles.logout} onClick={onLogout}>
          Log out
        </button>
      </aside>
    </div>
  );
}