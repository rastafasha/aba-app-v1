import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BehaviorAsistantService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listBehaviorAsistats() {
    const URL = url_servicios + '/behaviorasistant';
    return this.http.get(URL);
  }

  getBehaviorAsistat(user_id: any) {
    const URL = url_servicios + '/behaviorasistant/show/' + user_id;
    return this.http.get(URL);
  }

  getBehaviorAsistatbyPatientId(patient_id: any) {
    const URL =
      url_servicios + '/behaviorasistant/showgbyPatientId/' + patient_id;
    return this.http.get(URL);
  }
  createBehaviorAsistat(data) {
    const URL = url_servicios + '/behaviorasistant/store';
    return this.http.post(URL, data);
  }
  editBehaviorAsistat(data: any, user_id: any) {
    const URL = url_servicios + '/behaviorasistant/update/' + user_id;
    return this.http.post(URL, data);
  }
  deleteBehaviorAsistat(user_id: any) {
    const URL = url_servicios + '/behaviorasistant/destroy/' + user_id;
    return this.http.delete(URL);
  }

  showBehaviorAsistatProfile(user_id: any) {
    const URL = url_servicios + '/behaviorasistant/profile/' + user_id;
    return this.http.get(URL);
  }
}
