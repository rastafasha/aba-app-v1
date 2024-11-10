import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { InsuranceV2, ListParameters, ListResponse } from '../models';
import { ApiV2Service } from './api.v2.service';

@Injectable({ providedIn: 'root' })
export class InsurancesV2Service extends ApiV2Service<InsuranceV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/insurance');
  }

  override get(id: number): Observable<InsuranceV2> {
    return super.get(id).pipe(map((note) => this.transform(note)));
  }
  override list(
    options?: ListParameters
  ): Observable<ListResponse<InsuranceV2>> {
    return super.list(options).pipe(
      map((response) => ({
        ...response,
        data: response?.data?.map((data) => this.transform(data)),
      }))
    );
  }

  transform(data: unknown): InsuranceV2 {
    if (!data) return null;
    return InsuranceV2.build(data as object);
  }
}
