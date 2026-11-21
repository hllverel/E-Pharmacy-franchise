import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SharedLayout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {isLoggedIn && <Footer />}
    </>
  );
}