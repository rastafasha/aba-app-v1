import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BipV2 } from 'src/app/core/models';
import { Maladaptive } from 'src/app/pages/dashboard/models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class BipService {
  constructor(public http: HttpClient) {}

  listBips() {
    const URL = url_servicios + '/bip';
    return this.http.get<any>(URL);
  }

  getBip(client_id: any) {
    const URL = url_servicios + '/bip/show/' + client_id;
    return this.http.get<any>(URL);
  }
  getBipByUser(client_id: any) {
    const URL = url_servicios + '/bip/show/byuser/' + client_id;
    return this.http.get<{
      bip: BipV2;
      type_of_assessment: number;
      documents_reviewed: { index: number; title: string }[];
      maladaptives: Maladaptive[];
    }>(URL);
  }
  getBipByPatient_id(patient_id: any) {
    const URL = url_servicios + '/bip/show/byuserpatientid/' + patient_id;
    return this.http.get<any>(URL);
  }
  getBipProfilePatient_id(patient_id: any) {
    const URL = url_servicios + '/bip/profileBip/' + patient_id;
    return this.http.get<any>(URL);
  }

  getBipProfilePatientPdf_id(patient_id: any) {
    const URL = url_servicios + '/bip/profileBipPdf/' + patient_id;
    return this.http.get<any>(URL);
  }
  createBip(data) {
    const URL = url_servicios + '/bip/store';
    return this.http.post<any>(URL, data);
  }
  editBip(data: any, client_id: any) {
    const URL = url_servicios + '/bip/update/' + client_id;
    return this.http.post<any>(URL, data);
  }
  deleteBip(client_id: any) {
    const URL = url_servicios + '/bip/destroy/' + client_id;
    return this.http.delete<any>(URL);
  }

  showBipProfile(patient_id: any) {
    const URL = url_servicios + '/bip/profile/' + patient_id;
    return this.http.get<any>(URL);
  }
  showBipPatientId(patient_id: any) {
    const URL = url_servicios + '/bip/byuserpatientid/' + patient_id;
    return this.http.get<any>(URL);
  }

  listConfig() {
    const URL = url_servicios + '/bip/config';
    return this.http.get<any>(URL);
  }

  update(data: any, client_id: any) {
    const URL = url_servicios + '/bip/update/' + client_id;
    return this.http.put<any>(URL, data);
  }
  updateStatus(data: any, client_id: any) {
    const URL = url_servicios + '/bip/update/eligibility/' + client_id;
    return this.http.put<any>(URL, data);
  }
}
