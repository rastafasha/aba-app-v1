import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';

@Component({
  selector: 'app-goal-form-simple',
  templateUrl: './goal-form-simple.component.html',
  styleUrls: ['./goal-form-simple.component.scss'],
})
export class GoalFormSimpleComponent {
  @Input() goal: PlanV2;
  @Output() goalChange = new EventEmitter<PlanV2>();
}
