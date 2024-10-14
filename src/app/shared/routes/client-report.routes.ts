import { baseUrl } from './routes';

export class ClientReportRoutes {
  static get clientReport(): string {
    return `${baseUrl}/client-report`;
  }
  static get byClient(): string {
    return `${baseUrl}/client-report/by-client`;
  }
}
