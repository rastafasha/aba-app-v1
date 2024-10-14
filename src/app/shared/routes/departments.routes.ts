import { baseUrl } from './routes';

export class DepartmentsRoutes {
  static get edit(): string {
    return `${baseUrl}/departments/edit-department`;
  }

  static get list(): string {
    return `${baseUrl}/departments/department-list`;
  }
}
