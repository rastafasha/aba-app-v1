import { Component } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { OnPlansEdit } from '../on-plans-edit/on-plans-edit';

@Component({
  selector: 'app-sustitution-list',
  templateUrl: './sustitution-list.component.html',
  styleUrls: ['./sustitution-list.component.scss'],
})
export class SustitutionListComponent extends OnPlansEdit {
  protected newGoal: PlanV2 = {
    ...PlanV2.getDefault(),
    category: 'sustitution',
  };
  options = this.defaultOptions;
}
