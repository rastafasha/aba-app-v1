import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GraphicReductionService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listGraphics() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/graphic_reduction';
    return this.http.get(URL, { headers: headers });
  }

  getGraphic(user_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/graphic_reduction/show/' + user_id;
    return this.http.get(URL, { headers: headers });
  }

  listMaladaptivesGraphics(maladaptive: any, patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL =
      url_servicios +
      '/graphic_reduction/showbyMaladaptive/' +
      maladaptive +
      '/' +
      patient_id;
    return this.http.get(URL, { headers: headers });
  }
  listReductionGraphics(replacement: any, patient_id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL =
      url_servicios +
      '/graphic_reduction/showbyReplacement/' +
      replacement +
      '/' +
      patient_id;
    return this.http.get<any>(URL, { headers: headers });
  }

  listConfig() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/graphic_reduction/config';
    return this.http.get(URL, { headers: headers });
  }

  getPatient(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/graphic_reduction/showpatient/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }

  graphicPatientMonth(data) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/graphic_reduction/patient-month';
    return this.http.post(URL, data, { headers: headers });
  }
}
