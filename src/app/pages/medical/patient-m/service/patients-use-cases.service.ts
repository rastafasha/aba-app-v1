import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PatientsUseCasesService {
  loadFile(event: any) {
    throw new Error('Method not implemented.');
  }
  goBack() {
    this.location.back();
  }
  init() {
    // Initialize any necessary data or services here.
  }

  constructor(private location: Location) {}
}
