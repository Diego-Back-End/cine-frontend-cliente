import { Routes, Route } from 'react-router';
import LoginPageClient from '../pages/LoginPageClient'; 
import CarteleraPage from '../pages/CarteleraPage';
import DetallePeliculaPage from '../pages/DetallePeliculaPage';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CarteleraPage />} />
      <Route path="/login" element={<LoginPageClient />} />
      <Route path="/pelicula/:id" element={<DetallePeliculaPage />} />
    </Routes>
  );
};

export default AppRoutes;