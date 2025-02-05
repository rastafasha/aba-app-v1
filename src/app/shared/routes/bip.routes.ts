import { baseUrl } from './routes';

export class BipRoutes {
  static get bip(): string {
    return `${baseUrl}/bip`;
  }

  static get list(): string {
    return `${baseUrl}/bip/list`;
  }

  static get register(): string {
    return `${baseUrl}/bip/register`;
  }

  static get goalAdd(): string {
    return `${baseUrl}/bip/goal/add`;
  }

  static get attention(): string {
    return `${baseUrl}/bip/attention`;
  }

  static get profile(): string {
    return `${baseUrl}/bip/profile`;
  }

  static get show(): string {
    return `${baseUrl}/bip/show/patient`;
  }
}
