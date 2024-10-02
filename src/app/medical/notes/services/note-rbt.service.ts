import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoteRbtService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listNotes() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt';
    return this.http.get(URL, { headers: headers });
  }

  getNote(client_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/show/' + client_id;
    return this.http.get(URL, { headers: headers });
  }
  createNote(data) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/note_rbt/store';
    return this.http
      .post(URL, data, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error.message || error.statusText;
    }
    return throwError(errorMessage);
  }

  createReplacementNote(data) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/storeReplacemts';
    return this.http.post(URL, data, { headers: headers });
  }
  editNote(data: any, client_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/update/' + client_id;
    return this.http.post(URL, data, { headers: headers });
  }

  noteUpdateModifier(data: any, client_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/update/modifier/' + client_id;
    return this.http.put(URL, data, { headers: headers });
  }

  deleteNote(patient_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/destroy/' + patient_id;
    return this.http.delete(URL, { headers: headers });
  }

  showNotebyPatient(patient_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/byprofile/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }
  showReplacementbyPatient(patient_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL =
      url_servicios + '/note_rbt/showReplacementBypatient/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }
  showNotebyClient(client_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/byclient/' + client_id;
    return this.http.get(URL, { headers: headers });
  }

  listConfigNote(): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/config';
    return this.http
      .get<any[]>(URL, { headers: headers })
      .pipe(map((resp: any) => resp));
  }

  updateStatus(data: any, client_id: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/update/status/' + client_id;
    return this.http.put(URL, data, { headers: headers });
  }

  generateAISummary(data: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let URL = url_servicios + '/note_rbt/generate-summary';
    return this.http.post(URL, data, { headers: headers });
  }
}
