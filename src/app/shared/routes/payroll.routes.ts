import { baseUrl } from './routes';

export class PayrollRoutes {
  static get addSalary(): string {
    return `${baseUrl}/payroll/add-salary`;
  }

  static get editSalary(): string {
    return `${baseUrl}/payroll/edit-salary`;
  }

  static get salaryView(): string {
    return `${baseUrl}/payroll/salary-view`;
  }
}
