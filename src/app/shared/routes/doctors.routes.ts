import { baseUrl } from './routes';

export class DoctorsRoutes {
  static get doctors(): string {
    return `${baseUrl}/doctors`;
  }
  static get add(): string {
    return `${baseUrl}/doctors/add`;
  }

  static get profile(): string {
    return `${baseUrl}/doctors/profile`;
  }

  static get setting(): string {
    return `${baseUrl}/doctors/setting`;
  }

  static get list(): string {
    return `${baseUrl}/doctors/list`;
  }

  static get listEdit(): string {
    return `${baseUrl}/doctors/list/edit`;
  }

  static get edit(): string {
    return `${baseUrl}/doctors/edit`;
  }
}
