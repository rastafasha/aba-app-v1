import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { PlanEditComponent } from '../plan-edit/plan-edit.component';

@Component({
  selector: 'app-monitoring-evaluating-edit',
  templateUrl: './monitoring-evaluating-edit.component.html',
  styleUrls: ['./monitoring-evaluating-edit.component.scss'],
})
export class MonitoringEvaluatingEditComponent extends PlanEditComponent {
  @Input() input: PlanV2;
  @Output() inputChange = new EventEmitter<PlanV2>();
  @Output() save = new EventEmitter<PlanV2>();
}
