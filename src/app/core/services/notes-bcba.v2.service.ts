import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { NoteBcbaV2 } from '../models';
import { ApiV2Service } from './api.v2.service';

@Injectable({ providedIn: 'root' })
export class NotesBcbaV2Service extends ApiV2Service<NoteBcbaV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/notes/bcba');
  }
}
