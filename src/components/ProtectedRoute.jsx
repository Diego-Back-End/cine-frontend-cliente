import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

// Envuelve rutas privadas (reserva / compra). Si no hay sesión,
// inicia el flujo de autenticación de Cognito una sola vez.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const redirigiendo = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !redirigiendo.current) {
      redirigiendo.current = true;
      login();
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading) {
    return (
      <main className="hero min-h-screen bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-sm text-base-content/60">Cargando...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="hero min-h-screen bg-base-200">
        <p className="text-sm text-base-content/60">Redirigiendo...</p>
      </main>
    );
  }

  return children;
};

export default ProtectedRoute;
