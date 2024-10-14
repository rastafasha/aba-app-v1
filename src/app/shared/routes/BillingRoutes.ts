import { baseUrl } from './routes';

export class BillingRoutes {
  static get billing(): string {
    return `${baseUrl}/billing`;
  }
  static get list(): string {
    return `${baseUrl}/billing/list`;
  }

  static get byClient(): string {
    return `${baseUrl}/billing/by-client`;
  }
}
