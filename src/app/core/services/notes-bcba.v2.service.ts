import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { ListParameters, ListResponse, NoteBcbaV2 } from '../models';
import { ApiV2Service } from './api.v2.service';

@Injectable({ providedIn: 'root' })
export class NotesBcbaV2Service extends ApiV2Service<NoteBcbaV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/notes/bcba');
  }
  override get(id: number): Observable<NoteBcbaV2> {
    return super.get(id).pipe(map((note) => this.transform(note)));
  }
  override list(
    options?: ListParameters
  ): Observable<ListResponse<NoteBcbaV2>> {
    return super.list(options).pipe(
      map((response) => ({
        ...response,
        data: response?.data?.map((data) => this.transform(data)),
      }))
    );
  }

  transform(data: unknown): NoteBcbaV2 {
    if (!data) return null;
    return NoteBcbaV2.build(data as object);
  }
}
