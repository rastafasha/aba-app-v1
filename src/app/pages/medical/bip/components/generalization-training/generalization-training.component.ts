import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GeneralizationTraining,
  TransitionFadingPlan,
} from 'src/app/core/models';
import { ListAndFormComponent } from 'src/app/shared/components/list-and-form/list-and-form.component';

@Component({
  selector: 'app-generalization-training',
  templateUrl: './generalization-training.component.html',
  styleUrls: ['./generalization-training.component.scss'],
})
export class GeneralizationTrainingComponent {
  @Input() input: GeneralizationTraining[] = [];
  @Output() inputChange = new EventEmitter<GeneralizationTraining[]>();
  @Output() save = new EventEmitter<GeneralizationTraining[]>();

  state: 'list' | 'edit' = 'list';
  newItem: GeneralizationTraining = {} as GeneralizationTraining;

  displayedColumns: (keyof GeneralizationTraining)[] = ['discharge_plan'];
  renders = {};
  options = [
    {
      text: 'Select',
      icon: 'fa fa-eye',
      class: 'btn btn-outline-primary btn-sm',
      action: (item: GeneralizationTraining) => this.onEdit(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: GeneralizationTraining, context: never) =>
        this.onDelete(item, context),
    },
  ];

  newTransitionFadingPlan = TransitionFadingPlan.getDefault();

  onBack() {
    this.state = 'list';
  }

  onEdit(item: GeneralizationTraining) {
    this.newItem = { ...item };
    this.state = 'edit';
  }
  onDelete(
    item: GeneralizationTraining,
    context: ListAndFormComponent<GeneralizationTraining>
  ) {
    context.onDelete(item);
  }

  onSave() {
    this.save.emit(this.input);
    this.state = 'list';
  }
}
