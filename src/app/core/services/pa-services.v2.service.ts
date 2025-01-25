import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { fromIsoToDate } from 'src/app/shared/utils';
import {
  ApiV2Response,
  ListParameters,
  ListResponse,
  PaServiceV2,
} from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class PaServicesV2Service extends RepositoryV2Service<PaServiceV2> {
  private original_endpoint = `${url_servicios}/v2/patients/:patient_id/pa-services`;
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/patients/:patient_id/pa-services');
  }
  transform(data: unknown): PaServiceV2 {
    return new PaServiceV2(data);
  }
  override untransform(data: PaServiceV2): unknown {
    console.log(data);
    data.start_date = fromIsoToDate(data.start_date) as never;
    data.end_date = fromIsoToDate(data.end_date) as never;
    delete data.created_at;
    delete data.updated_at;
    delete data.deleted_at;
    return data;
  }
  //////////////////////
  private changeEndpoint(id: number) {
    if (!id) throw new Error('You must provide patient id');
    this.endpoint = this.original_endpoint.replace(':patient_id', id + '');
  }

  private restoreEndpoint<T>() {
    return tap<T>(() => (this.endpoint = this.original_endpoint));
  }

  override create(
    data: Partial<PaServiceV2>
  ): Observable<ApiV2Response<PaServiceV2>> {
    this.changeEndpoint(data?.patient_id);
    return super.create(data).pipe(this.restoreEndpoint());
  }

  ////////////////////
  // get(id: number): Observable<ApiV2Response<PaServiceV2>>;
  get(id: number, patient_id = 0): Observable<ApiV2Response<PaServiceV2>> {
    this.changeEndpoint(patient_id);
    return super.get(id).pipe(this.restoreEndpoint());
  }

  // list(options: ListParameters): Observable<ListResponse<PaServiceV2>>;
  list(
    options: ListParameters,
    patient_id = 0
  ): Observable<ListResponse<PaServiceV2>> {
    this.changeEndpoint(patient_id);
    return super.list(options).pipe(this.restoreEndpoint());
  }

  override update(
    data: PaServiceV2,
    id: number
  ): Observable<ApiV2Response<PaServiceV2>> {
    this.changeEndpoint(data?.patient_id);
    return super.update(data, id).pipe(this.restoreEndpoint());
  }

  // override delete(id: number): Observable<void>;
  override delete(
    id: number,
    patient_id = 0
  ): Observable<ApiV2Response<PaServiceV2>> {
    this.changeEndpoint(patient_id);
    return super.delete(id).pipe(this.restoreEndpoint());
  }
  ////////////////////
}
