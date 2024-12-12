import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { fromIsoToDate } from 'src/app/shared/utils';
import { PatientV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class PatientsV2Service extends RepositoryV2Service<PatientV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/patients');
  }

  transform(data: unknown): PatientV2 {
    if (!data) return null;
    return new PatientV2(data as Partial<PatientV2>);
  }

  override untransform(data: PatientV2): unknown {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = { ...data };
    result.birth_date = fromIsoToDate(data?.birth_date);
    result.parent_birth_date = fromIsoToDate(data?.parent_birth_date);
    result.elegibility_date = fromIsoToDate(data?.elegibility_date);
    delete result.created_at;
    delete result.updated_at;
    delete result.delete_at;
    return result;
  }
}
