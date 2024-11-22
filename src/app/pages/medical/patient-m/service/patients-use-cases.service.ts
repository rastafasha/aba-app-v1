import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { PatientMService } from './patient-m.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsUseCasesService {
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
    private patientsUseCases: PatientMService
  ) {}
}
