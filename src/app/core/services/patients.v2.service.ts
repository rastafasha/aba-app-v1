import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { PatientV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class PatientsV2Service extends RepositoryV2Service<PatientV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/patients');
  }

  transform(data: unknown): PatientV2 {
    if (!data) return null;
    return PatientV2.build(data as object);
  }
}
