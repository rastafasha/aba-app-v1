import { baseUrl } from './routes';

export class DashboardRoutes {
  static get dashboard(): string {
    return `${baseUrl}/dashboard`;
  }

  static get admin(): string {
    return `${baseUrl}/dashboard/admin`;
  }

  static get doctor(): string {
    return `${baseUrl}/dashboard/doctor`;
  }

  static get patient(): string {
    return `${baseUrl}/dashboard/patient`;
  }
}
