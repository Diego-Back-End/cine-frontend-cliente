import { UserManager } from 'oidc-client-ts';

const authority = import.meta.env.VITE_COGNITO_AUTHORITY;
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

const baseSettings = {
  authority,
  client_id: clientId,
  redirect_uri: window.location.origin + import.meta.env.BASE_URL,
  response_type: 'code',
  scope: 'openid email profile',
};

export const oidcConfig = {
  ...baseSettings,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

let userManager;

export function getUserManager() {
  if (!userManager) {
    userManager = new UserManager(baseSettings);
  }
  return userManager;
}

export function getStoredUser() {
  try {
    const raw = sessionStorage.getItem(`oidc.user:${authority}:${clientId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
