import { Component, Input } from '@angular/core';
import { GoalV2, PatientV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-maladaptives[patient]',
  templateUrl: './bip-profile-maladaptives.component.html',
  styleUrls: ['./bip-profile-maladaptives.component.scss'],
})
export class BipProfileMaladaptivesComponent {
  @Input() maladaptives: GoalV2[];
  @Input() patient: PatientV2;
}
