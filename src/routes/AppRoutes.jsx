import { useLocation } from 'react-router';
import { Routes, Route } from 'react-router';
import LoginPageClient from '../pages/LoginPageClient';
import CarteleraPage from '../pages/CarteleraPage';
import DetallePeliculaPage from '../pages/DetallePeliculaPage';
import SeleccionAsientosPage from '../pages/SeleccionAsientosPage';
import CompraConfirmacionPage from '../pages/CompraConfirmacionPage';
import ProtectedRoute from '../components/ProtectedRoute';

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
      <Route
        path="/reserva/:funcionId"
        element={
          <ProtectedRoute>
            <SeleccionAsientosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/compra"
        element={
          <ProtectedRoute>
            <CompraConfirmacionPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;