import { baseUrl } from './routes';

export class CallsRoutes {
  static get incoming(): string {
    return `${baseUrl}/calls/incoming-call`;
  }

  static get video(): string {
    return `${baseUrl}/calls/video-call`;
  }

  static get voice(): string {
    return `${baseUrl}/calls/voice-call`;
  }
}
