import { Component, Input } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { OnPlansEdit } from '../on-plans-edit/on-plans-edit';

@Component({
  selector: 'app-reduction-goal-form',
  templateUrl: './reduction-goal-form.component.html',
  styleUrls: ['./reduction-goal-form.component.scss'],
})
export class ReductionGoalFormComponent extends OnPlansEdit {
  @Input() patient_identifier: string;
  protected newGoal: PlanV2 = {
    ...PlanV2.getDefault(),
    category: 'maladaptive',
  };
  options = this.defaultOptions;
}
