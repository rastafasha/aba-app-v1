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
    const URL = url_servicios + '/graphic_reduction';
    return this.http.get(URL);
  }

  getGraphic(user_id: any) {
    const URL = url_servicios + '/graphic_reduction/show/' + user_id;
    return this.http.get(URL);
  }

  listMaladaptivesGraphics(maladaptive: any, patient_id: any) {
    const URL =
      url_servicios +
      '/graphic_reduction/showbyMaladaptive/' +
      maladaptive +
      '/' +
      patient_id;
    return this.http.get(URL);
  }
  listReductionGraphics(replacement: any, patient_id: any): Observable<any> {
    const URL =
      url_servicios +
      '/graphic_reduction/showbyReplacement/' +
      replacement +
      '/' +
      patient_id;
    return this.http.get<any>(URL);
  }

  listConfig() {
    const URL = url_servicios + '/graphic_reduction/config';
    return this.http.get(URL);
  }

  getPatient(patient_id: any) {
    const URL = url_servicios + '/graphic_reduction/showpatient/' + patient_id;
    return this.http.get(URL);
  }

  graphicPatientMonth(data) {
    const URL = url_servicios + '/graphic_reduction/patient-month';
    return this.http.post(URL, data);
  }
}
