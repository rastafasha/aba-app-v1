import { Component, Input } from '@angular/core';
import { Intervention } from 'src/app/core/models/v2/bip.v2.model';

@Component({
  selector: 'app-bip-profile-interventions',
  templateUrl: './bip-profile-interventions.component.html',
  styleUrls: ['./bip-profile-interventions.component.scss'],
})
export class BipProfileInterventionsComponent {
  @Input() interventions: Intervention[];
}
