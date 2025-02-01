import { Component } from '@angular/core';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-discharge-plan-form',
  templateUrl: './discharge-plan-form.component.html',
  styleUrls: ['./discharge-plan-form.component.scss'],
})
export class DischargePlanFormComponent extends InputDirective<string> {}
