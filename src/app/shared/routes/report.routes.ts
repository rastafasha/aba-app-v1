import { baseUrl } from './routes';

export class ReportRoutes {
  static get reports(): string {
    return `${baseUrl}/reports`;
  }
  static get logs(): string {
    return `${baseUrl}/reports/logs`;
  }
}
