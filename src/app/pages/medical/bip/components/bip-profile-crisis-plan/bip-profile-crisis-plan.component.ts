import { Component } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-crisis-plan',
  templateUrl: './bip-profile-crisis-plan.component.html',
  styleUrls: ['./bip-profile-crisis-plan.component.scss'],
})
export class BipProfileCrisisPlanComponent extends InputDirective<CrisisPlanV2> {}
