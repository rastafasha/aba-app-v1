import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { PatientMService } from './patient-m.service';
import { HttpClient } from '@angular/common/http';
import { url_servicios } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class PatientsUseCasesService {
  checkEmailExistense(email: string) {
    return this.http
      .get<any>(`${url_servicios}/doctors/check-email-exist/${email}`)
      .pipe(
        map((response) => {
          return response.exist.email !== null;
          // this.emailExists = response.exist.email;
          // if (this.emailExists === null) {
          //   this.emailExists = false;
          // } else {
          //   this.emailExists = true;
          // }
        })
      );
  }

  deleteLaboratory(id: number) {
    return of(null);
  }
  getPosCovered() {
    return this.patientsUseCases.getPosCovered().pipe(map((res) => res.data));
  }

  loadFile(event) {
    throw new Error('Method not implemented.');
  }
  deleteFile(file: File) {
    return of(null);
  }
  saveFiles(files: File[]) {
    throw new Error('Method not implemented.');
  }
  goBack() {
    this.location.back();
  }
  init() {
    // Initialize any necessary data or services here.
  }

  constructor(
    private location: Location,
    private patientsUseCases: PatientMService,
    private http: HttpClient
  ) {}
}
