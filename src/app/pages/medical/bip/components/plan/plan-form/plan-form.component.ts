import { Component, Input } from '@angular/core';
import { PLAN_STATUS_MAP, PlanV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class GoalFormSimpleComponent extends InputDirective<PlanV2> {
  @Input() title = 'Plan';
  @Input() showIntensity = false;
  status = PLAN_STATUS_MAP;
}
