import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { PatientV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';
import { StringOrNullOrUndefined } from 'src/app/shared/utils';

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
    result.pay = StringOrNullOrUndefined(data.pay);
    result.telehealth = StringOrNullOrUndefined(data.telehealth);
    result.birth_date = !data.birth_date
      ? null
      : data.birth_date.toISOString().split('T')[0];
    result.elegibility_date = !data.elegibility_date
      ? null
      : data.elegibility_date.toISOString().split('T')[0];
    delete result.created_at;
    delete result.updated_at;
    delete result.delete_at;
    return result;
  }
}
