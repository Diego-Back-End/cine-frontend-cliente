import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

// Envuelve rutas privadas (reserva / compra). Si no hay sesión,
// inicia el flujo de autenticación de Cognito.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const loginStarted = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !loginStarted.current) {
      loginStarted.current = true;
      login();
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] text-white">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  return children;
};

export default ProtectedRoute;
