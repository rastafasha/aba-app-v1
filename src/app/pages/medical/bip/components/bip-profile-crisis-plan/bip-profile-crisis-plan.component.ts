import { Component, Input } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-crisis-plan',
  templateUrl: './bip-profile-crisis-plan.component.html',
  styleUrls: ['./bip-profile-crisis-plan.component.scss'],
})
export class BipProfileCrisisPlanComponent {
  @Input() crisis_plan: CrisisPlanV2;
}
