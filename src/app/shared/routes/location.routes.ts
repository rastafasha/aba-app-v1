import { baseUrl } from './routes';

export class LocationRoutes {
  static get location(): string {
    return `${baseUrl}/location`;
  }
  static get list(): string {
    return `${baseUrl}/location/list`;
  }
  static get edit(): string {
    return `${baseUrl}/location/list/edit`;
  }

  static get view(): string {
    return `${baseUrl}/location/view`;
  }

  static get register(): string {
    return `${baseUrl}/location/register`;
  }
}
