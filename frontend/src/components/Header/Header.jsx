import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import Nav from '../Nav/Nav';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();
  // const isLoggedIn = true;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsMenuOpen(false);
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <Logo />
      {isLoggedIn && (
        <>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Icon name="burger" className={styles.burgerIcon} />
          </button>

          <div className={styles.desktopNav}>
            <Nav />
            <button type="button" className={styles.logout} onClick={handleLogout}>
              Log out
            </button>
          </div>
          
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onLogout={handleLogout}
          />
        </>
      )}
    </header>
  );
}