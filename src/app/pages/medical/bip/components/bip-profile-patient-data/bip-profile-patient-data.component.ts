import { Component, Input } from '@angular/core';
import { BipV2, PatientV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-patient-data',
  templateUrl: './bip-profile-patient-data.component.html',
  styleUrls: ['./bip-profile-patient-data.component.scss'],
})
export class BipProfilePatientDataComponent {
  @Input() patient: PatientV2;
  @Input() bip: BipV2;
}
