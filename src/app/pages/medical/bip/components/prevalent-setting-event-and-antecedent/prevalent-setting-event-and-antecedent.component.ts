import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrevalentSettingEventAndAntecedent } from 'src/app/core/models';

@Component({
  selector: 'app-prevalent-setting-event-and-antecedent',
  templateUrl: './prevalent-setting-event-and-antecedent.component.html',
  styleUrls: ['./prevalent-setting-event-and-antecedent.component.scss'],
})
export class PrevalentSettingEventAndAntecedentComponent {
  @Input() input: PrevalentSettingEventAndAntecedent;
  @Output() inputChange =
    new EventEmitter<PrevalentSettingEventAndAntecedent>();
  @Output() save = new EventEmitter<PrevalentSettingEventAndAntecedent>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
