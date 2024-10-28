import { baseUrl } from './routes';

export class NoteBcbaRoutes {
  static get noteBcba(): string {
    return `${baseUrl}/note-bcba`;
  }

  static get view(): string {
    return `${baseUrl}/note-bcba/view`;
  }

  static get add(): string {
    return `${baseUrl}/note-bcba/add`;
  }

  static get edit(): string {
    return `${baseUrl}/note-bcba/edit`;
  }

  static get list(): string {
    return `${baseUrl}/note-bcba/listbyclient`;
  }
}
