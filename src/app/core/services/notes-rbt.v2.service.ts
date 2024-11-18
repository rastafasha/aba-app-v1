import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { NoteRbtV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class NotesRbtV2Service extends RepositoryV2Service<NoteRbtV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/notes/rbt');
  }

  transform(data: unknown): NoteRbtV2 {
    if (!data) return null;
    return NoteRbtV2.build(data as object);
  }
}
