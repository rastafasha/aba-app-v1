import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  constructor(public http: HttpClient) {}

  listInsurances(page = 1, insurer_name = '') {
    let LINK = '';
    if (insurer_name) {
      LINK += '&insurer_name=' + insurer_name;
    }

    const URL = url_servicios + '/insurance?page=' + page + LINK;
    return this.http.get<any>(URL);
  }

  storeInsurance(data: any) {
    const URL = url_servicios + '/insurance/store';
    return this.http.post<any>(URL, data);
  }

  showInsurance(insurance_id: any) {
    const URL = url_servicios + '/insurance/show/' + insurance_id;
    return this.http.get<any>(URL);
  }

  showInsuranceCptPrize(insurer_name: any, code: any, provider: any) {
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

  editInsurance(data: any, insurance_id: number) {
    const URL = url_servicios + '/insurance/update/' + insurance_id;
    return this.http.put<any>(URL, data);
  }

  deleteInsurance(insurance_id: number) {
    const URL = url_servicios + '/insurance/destroy/' + insurance_id;
    return this.http.delete<any>(URL);
  }

  storeInsuranceService(data: any) {
    const URL = url_servicios + '/insurance/store/service';
    return this.http.post<any>(URL, data);
  }

  getServices() {
    const URL = url_servicios + '/insurance/service';
    return this.http.get<any>(URL);
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
