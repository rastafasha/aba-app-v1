import { Component } from '@angular/core';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-discharge-plan-show',
  templateUrl: './bip-profile-discharge-plan.component.html',
  styleUrls: ['./bip-profile-discharge-plan.component.scss'],
})
export class BipProfileDischargePlanComponent extends InputDirective<string> {}
