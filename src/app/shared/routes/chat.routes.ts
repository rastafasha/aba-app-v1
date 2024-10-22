import { baseUrl } from './routes';

export class ChatRoutes {
  static get chat(): string {
    return `${baseUrl}/chat`;
  }
}
