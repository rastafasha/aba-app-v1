import { baseUrl } from './routes';

export class ProfileRoutes {
  static get profile(): string {
    return `${baseUrl}/profile`;
  }
  static get edit(): string {
    return `${baseUrl}/edit-profile`;
  }
}
