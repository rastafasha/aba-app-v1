import { baseUrl } from './routes';

export class ErrorRoutes {
  static get error404(): string {
    return `${baseUrl}/error/error404`;
  }

  static get error500(): string {
    return `${baseUrl}/error/error500`;
  }
}
