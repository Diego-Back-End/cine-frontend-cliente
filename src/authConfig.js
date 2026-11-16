import { UserManager } from 'oidc-client-ts';

const authority = import.meta.env.VITE_COGNITO_AUTHORITY;
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const domain = import.meta.env.VITE_COGNITO_DOMAIN;

export const COGNITO_DOMAIN = domain;

export const REDIRECT_URI =
  window.location.origin + '/cine-frontend-cliente/';

export const authConfig = {
  authority,
  client_id: clientId,
  redirect_uri: REDIRECT_URI,
  response_type: 'code',
  scope: 'openid email phone profile',
  automaticSilentRenew: true,
  loadUserInfo: false,
};

export const userManager = new UserManager(authConfig);

export function onSigninCallback() {
  window.history.replaceState({}, document.title, window.location.pathname);
}
