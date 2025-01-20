import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssestmentEvaluationSetting } from 'src/app/core/models';

@Component({
  selector: 'app-assestment-evaluation-setting-form',
  templateUrl: './assestment-evaluation-setting-form.component.html',
  styleUrls: ['./assestment-evaluation-setting-form.component.scss'],
})
export class AssestmentEvaluationSettingFormComponent {
  @Input() input: AssestmentEvaluationSetting;
  @Output() inputChange = new EventEmitter<AssestmentEvaluationSetting>();
  @Output() save = new EventEmitter<AssestmentEvaluationSetting>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
