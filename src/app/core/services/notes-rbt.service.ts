import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { ApiService } from './api.service';
import { NoteRbt } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NoteRbtService extends ApiService<NoteRbt> {
  constructor(public http: HttpClient) {
    super(http, url_servicios + '/note_rbt');
  }

  getNote(id: number) {
    const URL = this.endpoint + '/show/' + id;
    return this.http.get<{
      target: number;
      replacements: any[];
      maladaptives: any[];
      interventions: any;
      noteRbt: NoteRbt;
    }>(URL);
  }

  createReplacementNote(data) {
    const URL = url_servicios + '/note_rbt/storeReplacemts';
    return this.http.post<any>(URL, data);
  }

  noteUpdateModifier(data: any, client_id: any) {
    const URL = url_servicios + '/note_rbt/update/modifier/' + client_id;
    return this.http.put<any>(URL, data);
  }

  showNotebyPatient(patient_id: any) {
    const URL = url_servicios + '/note_rbt/byprofile/' + patient_id;
    return this.http.get<any>(URL);
  }
  showReplacementbyPatient(patient_id: any) {
    const URL =
      url_servicios + '/note_rbt/showReplacementBypatient/' + patient_id;
    return this.http.get<any>(URL);
  }
  showNotebyClient(client_id: any) {
    const URL = url_servicios + '/note_rbt/byclient/' + client_id;
    return this.http.get<any>(URL);
  }

  listConfigNote(): Observable<any> {
    const URL = url_servicios + '/note_rbt/config';
    return this.http.get<any>(URL);
  }

  updateStatus(data: any, client_id: any) {
    const URL = url_servicios + '/note_rbt/update/status/' + client_id;
    return this.http.put<any>(URL, data);
  }

  generateAISummary(data: any) {
    const URL = url_servicios + '/note_rbt/generate-summary';
    return this.http.post<any>(URL, data);
  }

  getPdf(note_id: number) {
    const URL = url_servicios + '/v2/note_rbt/pdf/' + note_id;
    return this.http.get(URL, { responseType: 'arraybuffer' });
  }
}
