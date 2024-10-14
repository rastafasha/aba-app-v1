import { baseUrl } from './routes';

export class AssetsRoutes {
  static get add(): string {
    return `${baseUrl}/assets/add-asset`;
  }

  static get list(): string {
    return `${baseUrl}/assets/assets-list`;
  }

  static get edit(): string {
    return `${baseUrl}/assets/edit-asset`;
  }
}
