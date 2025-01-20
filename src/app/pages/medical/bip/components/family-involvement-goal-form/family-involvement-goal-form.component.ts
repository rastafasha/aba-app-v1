import { Component } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { OnPlansEdit } from '../on-plans-edit/on-plans-edit';

@Component({
  selector: 'app-family-involvement-goal-form',
  templateUrl: './family-involvement-goal-form.component.html',
  styleUrls: ['./family-involvement-goal-form.component.scss'],
})
export class FamilyInvolvementGoalFormComponent extends OnPlansEdit {
  protected newGoal: PlanV2 = { ...PlanV2.getDefault(), category: 'caregiver' };
  options = this.defaultOptions;
}
