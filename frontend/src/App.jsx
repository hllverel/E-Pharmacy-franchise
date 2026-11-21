import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';
import HomeRedirect from './routes/HomeRedirect';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CreateShopPage from './pages/CreateShopPage/CreateShopPage';
import EditShopPage from './pages/EditShopPage/EditShopPage';
import ShopPage from './pages/ShopPage/ShopPage';
import MedicinePage from './pages/MedicinePage/MedicinePage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomeRedirect />} />
        <Route
          path="register"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="create-shop"
          element={
            <PrivateRoute requireShop={false}>
              <CreateShopPage />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-shop"
          element={
            <PrivateRoute>
              <EditShopPage />
            </PrivateRoute>
          }
        />
        <Route
          path="shop"
          element={
            <PrivateRoute>
              <ShopPage />
            </PrivateRoute>
          }
        />
        <Route
          path="medicine/:productId"
          element={
            <PrivateRoute>
              <MedicinePage />
            </PrivateRoute>
          }
        />
        <Route
          path="statistics"
          element={
            <PrivateRoute>
              <StatisticsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}