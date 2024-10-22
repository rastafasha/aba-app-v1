import { baseUrl } from './routes';

export class PayrollRoutes {
  static get payroll(): string {
    return `${baseUrl}/payroll`;
  }
  static get salary(): string {
    return `${baseUrl}/payroll/salary`;
  }
  static get add(): string {
    return `${baseUrl}/payroll/add-salary`;
  }

  static get edit(): string {
    return `${baseUrl}/payroll/edit-salary`;
  }

  static get view(): string {
    return `${baseUrl}/payroll/salary-view`;
  }
}
