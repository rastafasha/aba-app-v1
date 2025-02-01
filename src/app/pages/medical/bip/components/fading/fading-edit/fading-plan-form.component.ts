import { Component } from '@angular/core';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-fading-plan-edit',
  templateUrl: './fading-plan-form.component.html',
  styleUrls: ['./fading-plan-form.component.scss'],
})
export class FadingPlanFormComponent extends InputDirective<string> {}
