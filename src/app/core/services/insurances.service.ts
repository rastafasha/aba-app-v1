import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import {
  Insurance,
  InsuranceModifier,
} from '../../pages/medical/location/models/locations.model';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService extends ApiService<Insurance> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/insurance');
  }

  listData(page = 1, options = {}) {
    const { insurer_name } = { insurer_name: '', ...options };

    let LINK = '';
    if (insurer_name) {
      LINK += '&insurer_name=' + insurer_name;
    }

    const URL = url_servicios + '/insurance?page=' + page + LINK;
    return this.http.get<{
      insurances: {
        data: Insurance[];
        id: number;
      };
    }>(URL);
  }

  //
  showInsuranceCptPrize(insurer_name: string, code: string, provider: string) {
    const URL =
      url_servicios +
      '/insurance/showInsuranceCpt/' +
      insurer_name +
      '/' +
      code +
      '/' +
      provider;
    return this.http.get<any>(URL);
  }

  storeInsuranceService(data: any) {
    const URL = url_servicios + '/insurance/store/service';
    return this.http.post<any>(URL, data);
  }

  getServices() {
    const URL = url_servicios + '/insurance/service';
    return this.http.get<any>(URL);
  }

  getModifiers(): Observable<InsuranceModifier[]> {
    return of([
      { value: 'HM', description: 'RBT', type: 'rbt', multiplier: 1 },
      {
        value: 'XE',
        description: '2 sessions same day, same provider, different POS',
        type: 'all',
        multiplier: 1,
      },
      {
        value: 'XP',
        description: 'RBT overlap Not reimbursed',
        type: 'rbt',
        multiplier: 0,
      },
      { value: 'HO', description: 'BCBA', type: 'bcba', multiplier: 1 },
      { value: 'GT', description: 'Telehealth', type: 'all', multiplier: 1 },
      { value: 'TS', description: 'Reassessment', type: 'all', multiplier: 1 },
      {
        value: '95',
        description: 'Telehealth (only AETNA)',
        type: 'all',
        multiplier: 1,
      },
    ]);
  }
  getServicebyInsurance(insurance_id: number) {
    const URL = url_servicios + '/insurance/servicebyInsurance/' + insurance_id;
    return this.http.get<any>(URL);
  }

  deleteInsuranceService(service_id: number) {
    const URL = url_servicios + '/insurance/destroy/service/' + service_id;
    return this.http.delete<any>(URL);
  }
}
