import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GeneralizationTraining,
  TransitionFadingPlan,
} from 'src/app/core/models';
import { ListRender } from 'src/app/shared/components/list/list.component';

@Component({
  selector: 'app-generalization-training-edit',
  templateUrl: './generalization-training-edit.component.html',
  styleUrls: ['./generalization-training-edit.component.scss'],
})
export class GeneralizationTrainingEditComponent {
  @Input() input: GeneralizationTraining;
  @Input() title: string;
  @Output() inputChange = new EventEmitter<GeneralizationTraining>();
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  displayedColumns: (keyof TransitionFadingPlan)[] = ['phase', 'description'];
  newPlan: TransitionFadingPlan = TransitionFadingPlan.getDefault();
  renders: ListRender<TransitionFadingPlan> = {};

  onSave() {
    this.save.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
}
