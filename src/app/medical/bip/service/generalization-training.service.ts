import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralizationTrainingService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listGeneralizationTrainings() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/generalizationtraining';
    return this.http.get(URL, { headers: headers });
  }

  getGeneralizationTraining(user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/generalizationtraining/show/' + user_id;
    return this.http.get(URL, { headers: headers });
  }

  getGeneralizationTrainingbyPatientId(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL =
      url_servicios + '/generalizationtraining/showgbyPatientId/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }

  createGeneralizationTraining(data) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/generalizationtraining/store';
    return this.http.post(URL, data, { headers: headers });
  }
  editGeneralizationTraining(data: any, user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/generalizationtraining/update/' + user_id;
    return this.http.post(URL, data, { headers: headers });
  }
  deleteGeneralizationTraining(user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/generalizationtraining/destroy/' + user_id;
    return this.http.delete(URL, { headers: headers });
  }

  showGeneralizationTrainingProfile(user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/generalizationtraining/profile/' + user_id;
    return this.http.get(URL, { headers: headers });
  }
}
