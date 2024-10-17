import { baseUrl } from './routes';

export class EmailRoutes {
  static get base(): string {
    return `${baseUrl}/email`;
  }

  static get compose(): string {
    return `${baseUrl}/email/compose`;
  }

  static get confirm(): string {
    return `${baseUrl}/email/confirm-mail`;
  }

  static get inbox(): string {
    return `${baseUrl}/email/inbox`;
  }

  static get view(): string {
    return `${baseUrl}/email/mail-view`;
  }
}
