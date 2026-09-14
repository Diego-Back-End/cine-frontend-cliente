import { useLocation } from 'react-router';
import { Routes, Route } from 'react-router';
import LoginPageClient from '../pages/LoginPageClient';
import CarteleraPage from '../pages/CarteleraPage';
import DetallePeliculaPage from '../pages/DetallePeliculaPage';

const AppRoutes = () => {
  const location = useLocation();
  const peliculaId = location.pathname.match(/^\/pelicula\/(.+)$/)?.[1];

  return (
    <Routes location={location}>
      <Route path="/" element={<CarteleraPage />} />
      <Route path="/login" element={<LoginPageClient />} />
      <Route
        path="/pelicula/:id"
        element={<DetallePeliculaPage key={peliculaId} />}
      />
    </Routes>
  );
};

export default AppRoutes;