import { baseUrl } from './routes';

export class ReportRoutes {
  static get expenseReports(): string {
    return `${baseUrl}/reports/expense-reports`;
  }
  static get invoiceReports(): string {
    return `${baseUrl}/reports/invoice-reports`;
  }
}
