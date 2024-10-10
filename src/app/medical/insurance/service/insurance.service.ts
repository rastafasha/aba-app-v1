import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listInsurances(page: number = 1, insurer_name: string = '') {
    let LINK = '';
    if (insurer_name) {
      LINK += '&insurer_name=' + insurer_name;
    }

    const URL = url_servicios + '/insurance?page=' + page + LINK;
    return this.http.get(URL);
  }

  storeInsurance(data: any) {
    const URL = url_servicios + '/insurance/store';
    return this.http.post(URL, data);
  }

  showInsurance(insurance_id: any) {
    const URL = url_servicios + '/insurance/show/' + insurance_id;
    return this.http.get(URL);
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
    return this.http.get(URL);
  }

  editInsurance(data: any, insurance_id: any) {
    const URL = url_servicios + '/insurance/update/' + insurance_id;
    return this.http.put(URL, data);
  }

  deleteInsurance(insurance_id: any) {
    const URL = url_servicios + '/insurance/destroy/' + insurance_id;
    return this.http.delete(URL);
  }

  storeInsuranceService(data: any) {
    const URL = url_servicios + '/insurance/store/service';
    return this.http.post(URL, data);
  }

  getServices() {
    const URL = url_servicios + '/insurance/service';
    return this.http.get(URL);
  }
  getServicebyInsurance(insurance_id: any) {
    const URL = url_servicios + '/insurance/servicebyInsurance/' + insurance_id;
    return this.http.get(URL);
  }

  deleteInsuranceService(service_id: any) {
    const URL = url_servicios + '/insurance/destroy/service/' + service_id;
    return this.http.delete(URL);
  }
}
