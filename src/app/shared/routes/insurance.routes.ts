import { baseUrl } from './routes';

export class InsuranceRoutes {
  static get insurance(): string {
    return `${baseUrl}/insurance`;
  }
  static get add(): string {
    return `${baseUrl}/insurance/register`;
  }

  static get list(): string {
    return `${baseUrl}/insurance/list`;
  }
  static get edit(): string {
    return `${baseUrl}/insurance/list/edit`;
  }
  static get view(): string {
    return `${baseUrl}/insurance/view`;
  }
}
