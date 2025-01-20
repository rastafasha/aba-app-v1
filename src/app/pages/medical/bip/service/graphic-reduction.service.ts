import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_servicios } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class GraphicReductionService {
  constructor(public http: HttpClient) {}

  listGraphics() {
    const URL = url_servicios + '/graphic_reduction';
    return this.http.get<any>(URL);
  }

  getGraphic(user_id: string) {
    const URL = url_servicios + '/graphic_reduction/show/' + user_id;
    return this.http.get<any>(URL);
  }

  listMaladaptivesGraphics(maladaptive: string, patient_id: string) {
    const URL =
      url_servicios +
      '/graphic_reduction/showbyMaladaptive/' +
      maladaptive +
      '/' +
      patient_id;
    return this.http.get<any>(URL);
  }

  listReductionGraphics(
    replacement: string,
    patient_id: string
  ): Observable<any> {
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
    return this.http.get<any>(URL);
  }

  getPatient(patient_id: string) {
    const URL = url_servicios + '/graphic_reduction/showpatient/' + patient_id;
    return this.http.get<any>(URL);
  }

  graphicPatientMonth(data: any) {
    const URL = url_servicios + '/graphic_reduction/patient-month';
    return this.http.post<any>(URL, data);
  }
}
