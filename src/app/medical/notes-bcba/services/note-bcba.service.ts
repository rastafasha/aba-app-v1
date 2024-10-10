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
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba';
    return this.http.get(URL, { headers: headers });
  }

  getNote(client_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/show/' + client_id;
    return this.http.get(URL, { headers: headers });
  }
  createNote(data) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/store';
    return this.http.post(URL, data, { headers: headers });
  }

  editNote(data: any, client_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/update/' + client_id;
    return this.http.post(URL, data, { headers: headers });
  }
  deleteNote(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/destroy/' + patient_id;
    return this.http.delete(URL, { headers: headers });
  }

  showNotebyPatient(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/byprofile/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }
  showReplacementbyPatient(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL =
      url_servicios + '/note_bcba/showReplacementBypatient/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }
  showNotebyClient(client_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/byclient/' + client_id;
    return this.http.get(URL, { headers: headers });
  }

  listConfigNote(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/config';
    return this.http
      .get<any[]>(URL, { headers: headers })
      .pipe(map((resp: any) => resp));
  }

  updateStatus(data: any, client_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/update/status/' + client_id;
    return this.http.put(URL, data, { headers: headers });
  }

  noteBCBAUpdateModifier(data: any, client_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/update/modifier/' + client_id;
    return this.http.put(URL, data, { headers: headers });
  }

  generateAISummary(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_bcba/generate-summary';
    return this.http.post(URL, data, { headers: headers });
  }
}
