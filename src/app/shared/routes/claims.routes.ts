import { baseUrl } from './routes';

export class ClaimsRoutes {
  static get claims(): string {
    return `${baseUrl}/claims`;
  }
}