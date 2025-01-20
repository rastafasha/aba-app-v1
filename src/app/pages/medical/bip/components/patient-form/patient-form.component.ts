import { Component, Input } from '@angular/core';
import { PatientV2 } from 'src/app/core/models';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent {
  @Input() patient: PatientV2;
}
