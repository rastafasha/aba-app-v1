import { HttpClient } from '@angular/common/http';
import { NoteRbt } from 'src/app/shared/models/notes.model';

export class NoteService<T> {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  list() {
    const URL = this.endpoint;
    return this.http.get<T[]>(URL);
  }

  get(id: number) {
    const URL = this.endpoint + '/show/' + id;
    return this.http.get<any>(URL);
  }

  create(data) {
    const URL = this.endpoint + '/store';
    return this.http.post<{
      message: number;
      message_text: string;
    }>(URL, data);
  }

  update(data: T, id: number) {
    const URL = this.endpoint + '/update/' + id;
    return this.http.post<{
      message: number;
      message_text: string;
    }>(URL, data);
  }

  delete(id: number) {
    const URL = this.endpoint + '/destroy/' + id;
    return this.http.delete<{
      message: number;
      message_text: string;
    }>(URL);
  }
}
