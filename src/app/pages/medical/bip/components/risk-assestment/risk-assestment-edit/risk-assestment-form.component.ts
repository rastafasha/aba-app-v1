import { Component } from '@angular/core';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-risk-assessment-edit',
  templateUrl: './risk-assestment-form.component.html',
  styleUrls: ['./risk-assestment-form.component.scss'],
})
export class RiskAssestmentFormComponent extends InputDirective<string> {}
