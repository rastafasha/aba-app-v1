import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { InsuranceV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class InsurancesV2Service extends RepositoryV2Service<InsuranceV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/insurance');
  }

  transform(response: unknown): InsuranceV2 {
    if (!response) return null;
    return InsuranceV2.build(response as object);
  }
}
