import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';

@Component({
  selector: 'app-crisis-plan-edit',
  templateUrl: './crisis-plan-edit.component.html',
  styleUrls: ['./crisis-plan-edit.component.scss'],
})
export class CrisisPlanEditComponent {
  @Input() input: CrisisPlanV2;
  @Output() inputChange = new EventEmitter<CrisisPlanV2>();
  @Output() save = new EventEmitter<CrisisPlanV2>();
  //
  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
