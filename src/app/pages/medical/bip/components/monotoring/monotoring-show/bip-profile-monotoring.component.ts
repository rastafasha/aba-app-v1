import { Component, Input } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-monotoring',
  templateUrl: './bip-profile-monotoring.component.html',
  styleUrls: ['./bip-profile-monotoring.component.scss'],
})
export class BipProfileMonotoringComponent {
  @Input() rbt_training_goals: PlanV2[];
}
