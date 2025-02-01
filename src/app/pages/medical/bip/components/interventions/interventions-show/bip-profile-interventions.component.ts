import { Component, Input } from '@angular/core';
import { Intervention } from 'src/app/core/models/v2/intervention.v2.model';

@Component({
  selector: 'app-interventions-show',
  templateUrl: './bip-profile-interventions.component.html',
  styleUrls: ['./bip-profile-interventions.component.scss'],
})
export class BipProfileInterventionsComponent {
  @Input() input: Intervention[];
}
