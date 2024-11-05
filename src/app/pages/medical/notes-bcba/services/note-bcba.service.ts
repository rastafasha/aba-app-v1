import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { NoteBcba } from 'src/app/shared/models/notes.model';
import { NoteService } from '../../notes/services/note.service';

@Injectable({
  providedIn: 'root',
})
export class NoteBcbaService extends NoteService<NoteBcba> {
  constructor(public http: HttpClient) {
    super(http, url_servicios + '/note_bcba');
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
