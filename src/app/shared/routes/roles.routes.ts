import { baseUrl } from './routes';

export class RolesRoutes {
  static get roles(): string {
    return `${baseUrl}/roles`;
  }
  static get register(): string {
    return `${baseUrl}/roles/register`;
  }

  static get list(): string {
    return `${baseUrl}/roles/list`;
  }
  static get edit(): string {
    return `${baseUrl}/roles/list/edit`;
  }
}
