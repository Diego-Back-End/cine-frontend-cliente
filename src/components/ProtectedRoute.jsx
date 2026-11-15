import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

// Envuelve rutas privadas (reserva / compra). Si no hay sesión,
// redirige al login guardando el destino para volver después.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
