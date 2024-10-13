import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoteRbtService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listNotes() {
    const URL = url_servicios + '/note_rbt';
    return this.http.get(URL);
  }

  getNote(client_id: any) {
    const URL = url_servicios + '/note_rbt/show/' + client_id;
    return this.http.get(URL);
  }
  createNote(data) {
    const URL = url_servicios + '/note_rbt/store';
    return this.http.post(URL, data).pipe(catchError(this.handleError));
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
    const URL = url_servicios + '/note_rbt/storeReplacemts';
    return this.http.post(URL, data);
  }
  editNote(data: any, client_id: any) {
    const URL = url_servicios + '/note_rbt/update/' + client_id;
    return this.http.post(URL, data);
  }

  noteUpdateModifier(data: any, client_id: any) {
    const URL = url_servicios + '/note_rbt/update/modifier/' + client_id;
    return this.http.put(URL, data);
  }

  deleteNote(patient_id: any) {
    const URL = url_servicios + '/note_rbt/destroy/' + patient_id;
    return this.http.delete(URL);
  }

  showNotebyPatient(patient_id: any) {
    const URL = url_servicios + '/note_rbt/byprofile/' + patient_id;
    return this.http.get(URL);
  }
  showReplacementbyPatient(patient_id: any) {
    const URL =
      url_servicios + '/note_rbt/showReplacementBypatient/' + patient_id;
    return this.http.get(URL);
  }
  showNotebyClient(client_id: any) {
    const URL = url_servicios + '/note_rbt/byclient/' + client_id;
    return this.http.get(URL);
  }

  listConfigNote(): Observable<any[]> {
    const URL = url_servicios + '/note_rbt/config';
    return this.http.get<any[]>(URL).pipe(map((resp: any) => resp));
  }

  updateStatus(data: any, client_id: any) {
    const URL = url_servicios + '/note_rbt/update/status/' + client_id;
    return this.http.put(URL, data);
  }

  generateAISummary(data: any) {
    const URL = url_servicios + '/note_rbt/generate-summary';
    return this.http.post(URL, data);
  }
}
