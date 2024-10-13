import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BipService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listBips() {
    const URL = url_servicios + '/bip';
    return this.http.get(URL);
  }

  getBip(client_id: any) {
    const URL = url_servicios + '/bip/show/' + client_id;
    return this.http.get(URL);
  }
  getBipByUser(client_id: any) {
    const URL = url_servicios + '/bip/show/byuser/' + client_id;
    return this.http.get(URL);
  }
  getBipByPatient_id(patient_id: any) {
    const URL = url_servicios + '/bip/show/byuserpatientid/' + patient_id;
    return this.http.get(URL);
  }
  getBipProfilePatient_id(patient_id: any) {
    const URL = url_servicios + '/bip/profileBip/' + patient_id;
    return this.http.get(URL);
  }

  getBipProfilePatientPdf_id(patient_id: any) {
    const URL = url_servicios + '/bip/profileBipPdf/' + patient_id;
    return this.http.get(URL);
  }
  createBip(data) {
    const URL = url_servicios + '/bip/store';
    return this.http.post(URL, data);
  }
  editBip(data: any, client_id: any) {
    const URL = url_servicios + '/bip/update/' + client_id;
    return this.http.post(URL, data);
  }
  deleteBip(client_id: any) {
    const URL = url_servicios + '/bip/destroy/' + client_id;
    return this.http.delete(URL);
  }

  showBipProfile(patient_id: any) {
    const URL = url_servicios + '/bip/profile/' + patient_id;
    return this.http.get(URL);
  }
  showBipPatientId(patient_id: any) {
    const URL = url_servicios + '/bip/byuserpatientid/' + patient_id;
    return this.http.get(URL);
  }

  listConfig() {
    const URL = url_servicios + '/bip/config';
    return this.http.get(URL);
  }

  update(data: any, client_id: any) {
    const URL = url_servicios + '/bip/update/' + client_id;
    return this.http.put(URL, data);
  }
  updateStatus(data: any, client_id: any) {
    const URL = url_servicios + '/bip/update/eligibility/' + client_id;
    return this.http.put(URL, data);
  }
}
