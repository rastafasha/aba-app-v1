import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { NoteBcbaV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class NotesBcbaV2Service extends RepositoryV2Service<NoteBcbaV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/notes/bcba');
  }

  transform(data: unknown): NoteBcbaV2 {
    if (!data) return null;
    return new NoteBcbaV2(data);
  }
}
