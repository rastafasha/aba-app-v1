import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MonitoringEvaluatingService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listMonitoringEvaluatings() {
    const URL = url_servicios + '/monitoringevaluating';
    return this.http.get<any>(URL);
  }

  getMonitoringEvaluating(user_id: any) {
    const URL = url_servicios + '/monitoringevaluating/show/' + user_id;
    return this.http.get<any>(URL);
  }

  getMonitoringEvaluatingbyPatientId(patient_id: any) {
    const URL =
      url_servicios + '/monitoringevaluating/showgbyPatientId/' + patient_id;
    return this.http.get<any>(URL);
  }

  createMonitoringEvaluating(data) {
    const URL = url_servicios + '/monitoringevaluating/store';
    return this.http.post<any>(URL, data);
  }
  editMonitoringEvaluating(data: any, user_id: any) {
    const URL = url_servicios + '/monitoringevaluating/update/' + user_id;
    return this.http.post<any>(URL, data);
  }
  deleteMonitoringEvaluating(user_id: any) {
    const URL = url_servicios + '/monitoringevaluating/destroy/' + user_id;
    return this.http.delete<any>(URL);
  }

  showMonitoringEvaluatingProfile(user_id: any) {
    const URL = url_servicios + '/monitoringevaluating/profile/' + user_id;
    return this.http.get<any>(URL);
  }
}
