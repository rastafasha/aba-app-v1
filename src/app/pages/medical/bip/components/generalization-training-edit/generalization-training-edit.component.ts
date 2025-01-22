import { Component, Input } from '@angular/core';
import {
  GeneralizationTraining,
  TransitionFadingPlan,
} from 'src/app/core/models';
import { ListRender } from 'src/app/shared/components/list/list.component';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-generalization-training-edit',
  templateUrl: './generalization-training-edit.component.html',
  styleUrls: ['./generalization-training-edit.component.scss'],
})
export class GeneralizationTrainingEditComponent extends InputDirective<GeneralizationTraining> {
  @Input() title: string;

  displayedColumns: (keyof TransitionFadingPlan)[] = ['phase', 'description'];
  newPlan: TransitionFadingPlan = TransitionFadingPlan.getDefault();
  renders: ListRender<TransitionFadingPlan> = {};
}
