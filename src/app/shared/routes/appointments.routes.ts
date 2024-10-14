import { baseUrl } from './routes';

export class AppointmentsRoutes {
  static get add(): string {
    return `${baseUrl}/appointments/add`;
  }

  static get list(): string {
    return `${baseUrl}/appointments/list`;
  }

  static get edit(): string {
    return `${baseUrl}/appointments/edit`;
  }
}
