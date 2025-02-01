import { Component } from '@angular/core';
import { PatientV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-show-patient',
  templateUrl: './bip-show-patient.component.html',
  styleUrls: ['./bip-show-patient.component.scss'],
})
export class BipShowPatientComponent extends InputDirective<PatientV2> {}
