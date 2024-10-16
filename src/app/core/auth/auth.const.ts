import { url_servicios } from 'src/app/config/config';

export const AUTH_CONSTS = {
  token: 'token',
  user: 'user',
  auth: 'authenticated',
  authToken: 'auth_token',
};

export const AUTH_URLS = {
  login: `${url_servicios}/login`,
  me: `${url_servicios}/me`,
};