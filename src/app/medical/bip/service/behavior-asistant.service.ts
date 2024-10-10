import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BehaviorAsistantService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listBehaviorAsistats() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/behaviorasistant';
    return this.http.get(URL, { headers: headers });
  }

  getBehaviorAsistat(user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/behaviorasistant/show/' + user_id;
    return this.http.get(URL, { headers: headers });
  }

  getBehaviorAsistatbyPatientId(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL =
      url_servicios + '/behaviorasistant/showgbyPatientId/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }
  createBehaviorAsistat(data) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/behaviorasistant/store';
    return this.http.post(URL, data, { headers: headers });
  }
  editBehaviorAsistat(data: any, user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/behaviorasistant/update/' + user_id;
    return this.http.post(URL, data, { headers: headers });
  }
  deleteBehaviorAsistat(user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/behaviorasistant/destroy/' + user_id;
    return this.http.delete(URL, { headers: headers });
  }

  showBehaviorAsistatProfile(user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/behaviorasistant/profile/' + user_id;
    return this.http.get(URL, { headers: headers });
  }
}
