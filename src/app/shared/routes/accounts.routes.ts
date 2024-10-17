import { baseUrl } from './routes';

export class AccountsRoutes {
  static get addPayment(): string {
    return `${baseUrl}/accounts/add-payment`;
  }
  static get expenses(): string {
    return `${baseUrl}/accounts/expenses`;
  }
  static get addExpense(): string {
    return `${baseUrl}/accounts/add-expense`;
  }
  static get editExpense(): string {
    return `${baseUrl}/accounts/edit-expense`;
  }
  static get invoices(): string {
    return `${baseUrl}/accounts/invoices`;
  }
  static get invoiceView(): string {
    return `${baseUrl}/accounts/invoice-view`;
  }
  static get payments(): string {
    return `${baseUrl}/accounts/payments`;
  }
  static get editPayment(): string {
    return `${baseUrl}/accounts/edit-payment`;
  }
  static get providentFund(): string {
    return `${baseUrl}/accounts/provident-fund`;
  }
  static get addProvidentFund(): string {
    return `${baseUrl}/accounts/add-provident-fund`;
  }
  static get editProvidentFund(): string {
    return `${baseUrl}/accounts/edit-provident-fund`;
  }
  static get taxes(): string {
    return `${baseUrl}/accounts/taxes`;
  }
  static get addTax(): string {
    return `${baseUrl}/accounts/add-tax`;
  }
  static get editTax(): string {
    return `${baseUrl}/accounts/edit-tax`;
  }
}
