import { baseUrl } from './routes';

export class SpecialitiesRoutes {
  static get add(): string {
    return `${baseUrl}/specialities/register`;
  }

  static get list(): string {
    return `${baseUrl}/specialities/list`;
  }
}
