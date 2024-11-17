import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { ListParameters, NoteBcbaV2 } from '../models';
import { ApiV2Service } from './api.v2.service';

@Injectable({ providedIn: 'root' })
export class NotesBcbaV2Service extends ApiV2Service<NoteBcbaV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/notes/bcba');
  }
  override get(id: number) {
    return super.get(id).pipe(map((note) => this.transform(note)));
  }
  override list(options?: ListParameters) {
    return super
      .list(options)
      .pipe(map((data) => data?.map((data) => this.transform(data))));
  }

  transform(data: unknown): NoteBcbaV2 {
    if (!data) return null;
    return NoteBcbaV2.build(data as object);
  }
}
