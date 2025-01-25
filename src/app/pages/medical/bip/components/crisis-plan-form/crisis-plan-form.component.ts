import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';

@Component({
  selector: 'app-crisis-plan-form',
  templateUrl: './crisis-plan-form.component.html',
})
export class CrisisPlanFormComponent {
  @Input() title = 'Crisis Plan';
  @Input() input: CrisisPlanV2 = CrisisPlanV2.getDefault();
  @Output() inputChange = new EventEmitter<CrisisPlanV2>();
  @Output() save = new EventEmitter<CrisisPlanV2>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }

  onCancel() {
    this.cancel.emit();
  }
}
