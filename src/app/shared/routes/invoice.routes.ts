import { baseUrl } from './routes';

export class InvoiceRoutes {
  static get add(): string {
    return `${baseUrl}/invoice/add-invoice`;
  }

  static get create(): string {
    return `${baseUrl}/invoice/create-invoice`;
  }

  static get edit(): string {
    return `${baseUrl}/invoice/edit-invoice`;
  }

  static get editAll(): string {
    return `${baseUrl}/invoice/edit-invoices`;
  }

  static get grid(): string {
    return `${baseUrl}/invoice/invoices-grid`;
  }

  static get all(): string {
    return `${baseUrl}/invoice/all-invoice`;
  }

  static get cancelled(): string {
    return `${baseUrl}/invoice/invoices-cancelled`;
  }

  static get draft(): string {
    return `${baseUrl}/invoice/invoices-draft`;
  }

  static get overdue(): string {
    return `${baseUrl}/invoice/invoices-overdue`;
  }

  static get paid(): string {
    return `${baseUrl}/invoice/invoices-paid`;
  }

  static get recurring(): string {
    return `${baseUrl}/invoice/invoices-recurring`;
  }

  static get settings(): string {
    return `${baseUrl}/invoice/invoices-settings`;
  }

  static get taxSettings(): string {
    return `${baseUrl}/invoice/tax-settings`;
  }

  static get view(): string {
    return `${baseUrl}/invoice/view-invoice`;
  }
}
