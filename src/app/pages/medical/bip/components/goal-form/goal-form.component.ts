import { Component, Input } from '@angular/core';
import { GoalV2 } from 'src/app/core/models';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent {
  @Input() goal: GoalV2;
}
