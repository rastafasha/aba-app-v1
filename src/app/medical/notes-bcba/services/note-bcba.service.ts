import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoteBcbaService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listNotes() {
    const URL = url_servicios + '/note_bcba';
    return this.http.get(URL);
  }

  getNote(client_id: any) {
    const URL = url_servicios + '/note_bcba/show/' + client_id;
    return this.http.get(URL);
  }
  createNote(data) {
    const URL = url_servicios + '/note_bcba/store';
    return this.http.post(URL, data);
  }

  editNote(data: any, client_id: any) {
    const URL = url_servicios + '/note_bcba/update/' + client_id;
    return this.http.post(URL, data);
  }
  deleteNote(patient_id: any) {
    const URL = url_servicios + '/note_bcba/destroy/' + patient_id;
    return this.http.delete(URL);
  }

  showNotebyPatient(patient_id: any) {
    const URL = url_servicios + '/note_bcba/byprofile/' + patient_id;
    return this.http.get(URL);
  }
  showReplacementbyPatient(patient_id: any) {
    const URL =
      url_servicios + '/note_bcba/showReplacementBypatient/' + patient_id;
    return this.http.get(URL);
  }
  showNotebyClient(client_id: any) {
    const URL = url_servicios + '/note_bcba/byclient/' + client_id;
    return this.http.get(URL);
  }

  listConfigNote(): Observable<any[]> {
    const URL = url_servicios + '/note_bcba/config';
    return this.http.get<any[]>(URL).pipe(map((resp: any) => resp));
  }

  updateStatus(data: any, client_id: any) {
    const URL = url_servicios + '/note_bcba/update/status/' + client_id;
    return this.http.put(URL, data);
  }

  noteBCBAUpdateModifier(data: any, client_id: any) {
    const URL = url_servicios + '/note_bcba/update/modifier/' + client_id;
    return this.http.put(URL, data);
  }

  generateAISummary(data: any) {
    const URL = url_servicios + '/note_bcba/generate-summary';
    return this.http.post(URL, data);
  }
}
