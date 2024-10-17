import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private http: HttpClient) {}

  listBillings() {
    const URL = url_servicios + '/billing';
    return this.http.get<any>(URL);
  }
  config() {
    const URL = url_servicios + '/billing/config';
    return this.http.get<any>(URL);
  }

  getBilling(id: any) {
    const URL = url_servicios + '/billing/show/' + id;
    return this.http.get<any>(URL);
  }

  editBilling(data: any, client_id: any) {
    const URL = url_servicios + '/billing/update/' + client_id;
    return this.http.post<any>(URL, data);
  }
  deleteBilling(patient_id: any) {
    const URL = url_servicios + '/billing/destroy/' + patient_id;
    return this.http.delete<any>(URL);
  }

  showBillingbyPatient(patient_id: any) {
    const URL = url_servicios + '/billing/byprofile/' + patient_id;
    return this.http.get<any>(URL);
  }

  showBillingProfile(patient_id: any) {
    const URL = url_servicios + '/billing/profile/' + patient_id;
    return this.http.get<any>(URL);
  }
}
