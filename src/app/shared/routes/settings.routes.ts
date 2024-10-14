import { baseUrl } from './routes';

export class SettingsRoutes {
  static get setting(): string {
    return `${baseUrl}/settings`;
  }

  static get general(): string {
    return `${baseUrl}/settings/general-settings`;
  }

  static get bank(): string {
    return `${baseUrl}/settings/bank-settings`;
  }

  static get email(): string {
    return `${baseUrl}/settings/email-settings`;
  }

  static get localization(): string {
    return `${baseUrl}/settings/localization-details`;
  }

  static get others(): string {
    return `${baseUrl}/settings/others-settings`;
  }

  static get payment(): string {
    return `${baseUrl}/settings/payment-settings`;
  }

  static get seo(): string {
    return `${baseUrl}/settings/seo-settings`;
  }

  static get socialLinks(): string {
    return `${baseUrl}/settings/social-links`;
  }

  static get social(): string {
    return `${baseUrl}/settings/social-settings`;
  }

  static get theme(): string {
    return `${baseUrl}/settings/theme-settings`;
  }
}
