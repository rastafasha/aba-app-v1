import { Component } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { OnPlansEdit } from '../../on-plans-edit/on-plans-edit';

@Component({
  selector: 'app-monitoring-edit',
  templateUrl: './monitoring-evaluating.component.html',
  styleUrls: ['./monitoring-evaluating.component.scss'],
})
export class MonitoringEvaluatingComponent extends OnPlansEdit {
  protected newGoal: PlanV2 = {
    ...PlanV2.getDefault(),
    category: 'rbt_training',
  };
  options = this.defaultOptions;
  displayedColumns: (keyof PlanV2)[] = ['name', 'description'];
}
