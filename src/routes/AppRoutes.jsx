import { Routes, Route } from 'react-router';
import LoginPageClient from '../pages/LoginPageClient'; 
import CarteleraPage from '../pages/CarteleraPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CarteleraPage />} />
      <Route path="/login" element={<LoginPageClient />} />
    </Routes>
  );
};

export default AppRoutes;