import { baseUrl } from './routes';

export class ActivityRoutes {
  static get activities(): string {
    return `${baseUrl}/activities`;
  }
}
