import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PLAN_STATUS_MAP, PlanV2 } from 'src/app/core/models';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class GoalFormSimpleComponent {
  @Input() input: PlanV2;
  @Output() inputChange = new EventEmitter<PlanV2>();
  @Input() title = 'Plan';
  @Output() save = new EventEmitter<PlanV2>();
  @Output() cancel = new EventEmitter<void>();
  status = PLAN_STATUS_MAP;

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
