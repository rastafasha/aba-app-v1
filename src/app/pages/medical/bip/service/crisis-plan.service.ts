import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CrisisPlanService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listCrisisPlans() {
    const URL = url_servicios + '/crisisplan';
    return this.http.get<any>(URL);
  }

  getCrisisPlan(user_id: any) {
    const URL = url_servicios + '/crisisplan/show/' + user_id;
    return this.http.get<any>(URL);
  }

  getCrisisPlanbyPatientId(patient_id: any) {
    const URL = url_servicios + '/crisisplan/showgbyPatientId/' + patient_id;
    return this.http.get<any>(URL);
  }

  createCrisisPlan(data) {
    const URL = url_servicios + '/crisisplan/store';
    return this.http.post<any>(URL, data);
  }
  editCrisisPlan(data: any, user_id: any) {
    const URL = url_servicios + '/crisisplan/update/' + user_id;
    return this.http.post<any>(URL, data);
  }
  deleteCrisisPlan(user_id: any) {
    const URL = url_servicios + '/crisisplan/destroy/' + user_id;
    return this.http.delete<any>(URL);
  }

  showCrisisPlanProfile(user_id: any) {
    const URL = url_servicios + '/crisisplan/profile/' + user_id;
    return this.http.get<any>(URL);
  }
}
