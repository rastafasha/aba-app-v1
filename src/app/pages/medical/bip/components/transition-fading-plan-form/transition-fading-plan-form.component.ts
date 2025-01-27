import { Component, OnInit } from '@angular/core';
import {
  deafultTransitionFadingPlan,
  TransitionFadingPlan,
} from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-transition-fading-plan-form',
  templateUrl: './transition-fading-plan-form.component.html',
  styleUrls: ['./transition-fading-plan-form.component.scss'],
})
export class TransitionFadingPlanFormComponent
  extends InputDirective<TransitionFadingPlan>
  implements OnInit
{
  phases_map = deafultTransitionFadingPlan;

  ngOnInit() {
    if (!this.input.description) {
      this.input.description = this.phases_map[this.input.phase];
    }
  }
  onPhaseChange() {
    if (this.input.phase) {
      this.input.description = this.phases_map[this.input.phase];
    }
  }
}
