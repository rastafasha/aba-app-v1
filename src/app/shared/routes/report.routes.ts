import { baseUrl } from './routes';

export class ReportRoutes {
  static get expenses(): string {
    return `${baseUrl}/reports/expense-reports`;
  }
  static get expensesEdit(): string {
    return `${baseUrl}/reports/expense-reports/edit`;
  }
  static get invoices(): string {
    return `${baseUrl}/reports/invoice-reports`;
  }
}
