import { baseUrl } from './routes';

export class PagesRoutes {
  static get blankPage(): string {
    return `${baseUrl}/blank-page`;
  }
}
