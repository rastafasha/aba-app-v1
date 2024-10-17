import { baseUrl } from './routes';

export class MedicalRoutes {
  static get medical(): string {
    return `${baseUrl}/medical`;
  }
}
