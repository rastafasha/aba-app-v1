import { baseUrl } from './routes';

export class ChatRoutes {
  static get base(): string {
    return `${baseUrl}/chat`;
  }
}
