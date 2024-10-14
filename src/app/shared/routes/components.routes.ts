import { baseUrl } from './routes';

export class ComponentsRoutes {
  static get tabs(): string {
    return `${baseUrl}/components/tabs`;
  }

  static get typography(): string {
    return `${baseUrl}/components/typography`;
  }

  static get uikit(): string {
    return `${baseUrl}/components/uikit`;
  }
}
