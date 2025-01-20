import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrisisPlan } from 'src/app/core/models';

@Component({
  selector: 'app-crisis-plan-form',
  templateUrl: './crisis-plan-form.component.html',
})
export class CrisisPlanFormComponent {
  @Input() title = 'Crisis Plan';
  @Input() input: CrisisPlan = CrisisPlan.getDefault();
  @Output() inputChange = new EventEmitter<CrisisPlan>();
  @Output() save = new EventEmitter<CrisisPlan>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }

  onCancel() {
    this.cancel.emit();
  }
}
