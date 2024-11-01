import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  mock: false,
  // url_backend: 'http://127.0.0.1:8000/',
  // url_servicios: 'http://127.0.0.1:8000/api',
  // url_frontend: 'http://localhost:4200/',
  // url_media: 'http://127.0.0.1:8000/storage/',
  //
  url_backend: 'https://abatherapy.malcolmcordova.com/backend-api-aba/',
  url_servicios:
    'https://abatherapy.malcolmcordova.com/backend-api-aba/public/api',
  url_frontend: 'https://abatherapy.malcolmcordova.com/',
  url_media:
    'https://abatherapy.malcolmcordova.com/backend-api-aba/public/storage/',
};
