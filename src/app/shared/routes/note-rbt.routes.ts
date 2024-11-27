import { baseUrl } from './routes';

export class NoteRbtRoutes {
  static get noteRbt(): string {
    return `${baseUrl}/note-rbt`;
  }

  static get add(): string {
    return `${baseUrl}/note-rbt/`;
  }

  static get edit(): string {
    return `${baseUrl}/note-rbt/edit`;
  }

  static get list(): string {
    return `${baseUrl}/note-rbt/listbyclient`;
  }
  static get view(): string {
    return `${baseUrl}/note-rbt/view`;
  }
}
