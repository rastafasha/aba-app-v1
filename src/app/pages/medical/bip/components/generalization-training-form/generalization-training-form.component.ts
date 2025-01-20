import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralizationTraining } from 'src/app/core/models';

@Component({
  selector: 'app-generalization-training-form',
  templateUrl: './generalization-training-form.component.html',
  styleUrls: ['./generalization-training-form.component.scss'],
})
export class GeneralizationTrainingFormComponent {
  @Input() input: GeneralizationTraining;
  @Input() title = 'Generalization Training';
  @Output() inputChange = new EventEmitter<GeneralizationTraining>();
  @Output() save = new EventEmitter<GeneralizationTraining>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }

  onCancel() {
    this.cancel.emit();
  }
}
