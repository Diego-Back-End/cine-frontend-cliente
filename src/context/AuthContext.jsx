/* eslint-disable react-refresh/only-export-components */
import { useCallback, useMemo } from 'react';
import { useAuth as useOidcAuth } from 'react-oidc-context';

// Adapta la interfaz de autenticación que ya consumía la app (email/correo,
// login, logout e isAuthenticated) sobre react-oidc-context / Cognito.
export function useAuth() {
  const auth = useOidcAuth();
  const { user, isAuthenticated, isLoading, signinRedirect, removeUser } = auth;

  const correo = user?.profile?.email ?? '';

  const login = useCallback(() => {
    return signinRedirect();
  }, [signinRedirect]);

  const logout = useCallback(async () => {
    await removeUser();

    const domain = import.meta.env.VITE_COGNITO_DOMAIN;
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = encodeURIComponent(
      window.location.origin + import.meta.env.BASE_URL
    );

    window.location.href = `${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  }, [removeUser]);

  return useMemo(
    () => ({
      correo,
      email: correo,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [correo, isAuthenticated, isLoading, login, logout]
  );
}
