import { baseUrl } from './routes';

export class ClientReportRoutes {
  static get clientReport(): string {
    return `${baseUrl}/client-report`;
  }
  static get byClient(): string {
    //byclient
    return `${baseUrl}/client-report/by-client`;
  }
  static get employeeByClient(): string {
    //employee_reportbyclient
    return `${baseUrl}/client-report/employee-by-client`;
  }
}
