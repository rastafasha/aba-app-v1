import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConsentToTreatmentService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listConsentToTreatments() {
    const URL = url_servicios + '/consenttotreatment';
    return this.http.get(URL);
  }

  getConsentToTreatment(user_id: any) {
    const URL = url_servicios + '/consenttotreatment/show/' + user_id;
    return this.http.get(URL);
  }

  getConsentToTreatmentbyPatientId(patient_id: any) {
    const URL =
      url_servicios + '/consenttotreatment/showgbyPatientId/' + patient_id;
    return this.http.get(URL);
  }

  createConsentToTreatment(data) {
    const URL = url_servicios + '/consenttotreatment/store';
    return this.http.post(URL, data);
  }
  editConsentToTreatment(data: any, user_id: any) {
    const URL = url_servicios + '/consenttotreatment/update/' + user_id;
    return this.http.post(URL, data);
  }
  deleteConsentToTreatment(user_id: any) {
    const URL = url_servicios + '/consenttotreatment/destroy/' + user_id;
    return this.http.delete(URL);
  }

  showConsentToTreatmentProfile(user_id: any) {
    const URL = url_servicios + '/consenttotreatment/profile/' + user_id;
    return this.http.get(URL);
  }
}
