import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiV2Service } from './api.v2.service';
import { InsuranceV2 } from '../models';
import { url_servicios } from 'src/app/config/config';

@Injectable({ providedIn: 'root' })
export class InsurancesV2Service extends ApiV2Service<InsuranceV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/insurance');
  }
}
