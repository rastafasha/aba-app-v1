import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { ListParameters, ListResponse, NoteRbtV2 } from '../models';
import { ApiV2Service } from './api.v2.service';

@Injectable({ providedIn: 'root' })
export class NotesRbtV2Service extends ApiV2Service<NoteRbtV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/notes/rbt');
  }
  override get(id: number): Observable<NoteRbtV2> {
    return super.get(id).pipe(map((note) => this.transform(note)));
  }
  override list(options?: ListParameters): Observable<ListResponse<NoteRbtV2>> {
    return super.list(options).pipe(
      map((response) => ({
        ...response,
        data: response.data.map((data) => this.transform(data)),
      }))
    );
  }

  transform(data: unknown): NoteRbtV2 {
    if (!data) return null;
    return { ...(data as NoteRbtV2), type: 'rbt' };
  }
}
