import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DeEscalationTechniqueService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listDeEscalationTechniques() {
    const URL = url_servicios + '/deescalationtechnique';
    return this.http.get(URL);
  }

  getDeEscalationTechnique(user_id: any) {
    const URL = url_servicios + '/deescalationtechnique/show/' + user_id;
    return this.http.get(URL);
  }

  getDeEscalationTechniquebyPatientId(patient_id: any) {
    const URL =
      url_servicios + '/deescalationtechnique/showgbyPatientId/' + patient_id;
    return this.http.get(URL);
  }

  createDeEscalationTechnique(data) {
    const URL = url_servicios + '/deescalationtechnique/store';
    return this.http.post(URL, data);
  }
  editDeEscalationTechnique(data: any, user_id: any) {
    const URL = url_servicios + '/deescalationtechnique/update/' + user_id;
    return this.http.post(URL, data);
  }
  deleteDeEscalationTechnique(user_id: any) {
    const URL = url_servicios + '/deescalationtechnique/destroy/' + user_id;
    return this.http.delete(URL);
  }

  showDeEscalationTechniqueProfile(user_id: any) {
    const URL = url_servicios + '/deescalationtechnique/profile/' + user_id;
    return this.http.get(URL);
  }
}
