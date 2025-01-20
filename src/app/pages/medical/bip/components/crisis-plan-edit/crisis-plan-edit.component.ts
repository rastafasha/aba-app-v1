import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrisisPlan } from 'src/app/core/models';

@Component({
  selector: 'app-crisis-plan-edit',
  templateUrl: './crisis-plan-edit.component.html',
  styleUrls: ['./crisis-plan-edit.component.scss'],
})
export class CrisisPlanEditComponent {
  @Input() input: CrisisPlan;
  @Output() inputChange = new EventEmitter<CrisisPlan>();
  @Output() save = new EventEmitter<CrisisPlan>();
  //
  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
