import { baseUrl } from './routes';

export class AuthRoutes {
  // AUTH
  static get forgotPassword(): string {
    return `${baseUrl}/forgot-password`;
  }
  static get lockScreen(): string {
    return `${baseUrl}/lock-screen`;
  }
  static get login(): string {
    return `${baseUrl}/login`;
  }
  static get register(): string {
    return `${baseUrl}/register`;
  }
  static get changePassword(): string {
    return `${baseUrl}/change-password`;
  }
}
