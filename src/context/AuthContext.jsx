import { useCallback } from 'react';
import { useAuth as useOidcAuth } from 'react-oidc-context';
import { authConfig, REDIRECT_URI } from '../authConfig';

export function useAuth() {
  const auth = useOidcAuth();

  const email = auth.user?.profile?.email ?? '';
  const isAuthenticated = auth.isAuthenticated;

  const login = useCallback(() => {
    return auth.signinRedirect();
  }, [auth]);

  const logout = useCallback(() => {
    return auth.signoutRedirect({
      id_token_hint: auth.user?.id_token,
      extraQueryParams: {
        client_id: authConfig.client_id,
        logout_uri: REDIRECT_URI,
      },
    });
  }, [auth]);

  return {
    auth,
    email,
    isAuthenticated,
    isLoading: auth.isLoading,
    login,
    logout,
  };
}
