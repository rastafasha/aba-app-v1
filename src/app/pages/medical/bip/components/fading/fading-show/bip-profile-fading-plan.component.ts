import { Component } from '@angular/core';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-fading-plan',
  templateUrl: './bip-profile-fading-plan.component.html',
  styleUrls: ['./bip-profile-fading-plan.component.scss'],
})
export class BipProfileFadingPlanComponent extends InputDirective<string> {}
