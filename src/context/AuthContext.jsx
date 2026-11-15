/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';

// Clave usada para persistir la sesión del cliente en sessionStorage.
export const SESSION_EMAIL_KEY = 'cine-cliente-session-email';

export const AuthContext = createContext(null);

// TODO: Este provider implementa un login SIMULADO y TEMPORAL para clientes.
// TODO: Reemplazar por autenticación real con Amazon Cognito (hosted UI / tokens).
export function AuthProvider({ children }) {
  const [email, setEmail] = useState(
    () => sessionStorage.getItem(SESSION_EMAIL_KEY) || ''
  );

  const login = useCallback((correo) => {
    const normalizado = correo.trim().toLowerCase();
    sessionStorage.setItem(SESSION_EMAIL_KEY, normalizado);
    setEmail(normalizado);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_EMAIL_KEY);
    setEmail('');
  }, []);

  const value = {
    email,
    isAuthenticated: Boolean(email),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
