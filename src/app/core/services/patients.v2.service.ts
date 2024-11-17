import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { ListParameters, PatientV2 } from '../models';
import { ApiV2Service } from './api.v2.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientsV2Service extends ApiV2Service<PatientV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/patients');
  }

  override get(id: number): Observable<PatientV2> {
    return super.get(id).pipe(map((note) => this.transform(note)));
  }
  override list(options?: ListParameters) {
    return super
      .list(options)
      .pipe(map((data) => data?.map((data) => this.transform(data))));
  }

  transform(data: unknown): PatientV2 {
    if (!data) return null;
    return PatientV2.build(data as object);
  }
}
