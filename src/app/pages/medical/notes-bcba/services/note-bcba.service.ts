import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class NoteBcbaService {
  constructor(public http: HttpClient) {}

  listNotes() {
    const URL = url_servicios + '/note_bcba';
    return this.http.get<any>(URL);
  }

  getNote(client_id: any) {
    const URL = url_servicios + '/note_bcba/show/' + client_id;
    return this.http.get<any>(URL);
  }
  createNote(data) {
    const URL = url_servicios + '/note_bcba/store';
    return this.http.post<any>(URL, data);
  }

  editNote(data: any, client_id: any) {
    const URL = url_servicios + '/note_bcba/update/' + client_id;
    return this.http.post<any>(URL, data);
  }
  deleteNote(patient_id: any) {
    const URL = url_servicios + '/note_bcba/destroy/' + patient_id;
    return this.http.delete<any>(URL);
  }

  showNotebyPatient(patient_id: any) {
    const URL = url_servicios + '/note_bcba/byprofile/' + patient_id;
    return this.http.get<any>(URL);
  }
  showReplacementbyPatient(patient_id: any) {
    const URL =
      url_servicios + '/note_bcba/showReplacementBypatient/' + patient_id;
    return this.http.get<any>(URL);
  }
  showNotebyClient(client_id: any) {
    const URL = url_servicios + '/note_bcba/byclient/' + client_id;
    return this.http.get<any>(URL);
  }

  listConfigNote(): Observable<any> {
    const URL = url_servicios + '/note_bcba/config';
    return this.http.get<any>(URL);
  }

  updateStatus(data: any, client_id: any) {
    const URL = url_servicios + '/note_bcba/update/status/' + client_id;
    return this.http.put<any>(URL, data);
  }

  noteBCBAUpdateModifier(data: any, client_id: any) {
    const URL = url_servicios + '/note_bcba/update/modifier/' + client_id;
    return this.http.put<any>(URL, data);
  }

  generateAISummary(data: any) {
    const URL = url_servicios + '/note_bcba/generate-summary';
    return this.http.post<any>(URL, data);
  }
}
