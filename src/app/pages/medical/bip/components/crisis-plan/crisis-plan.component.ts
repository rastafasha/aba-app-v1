import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrisisPlan } from 'src/app/core/models';

@Component({
  selector: 'app-crisis-plan',
  templateUrl: './crisis-plan.component.html',
  styleUrls: ['./crisis-plan.component.scss'],
})
export class CrisisPlanComponent {
  @Input() crisis_plan: CrisisPlan;
  @Output() crisis_planChange = new EventEmitter<CrisisPlan>();
  @Output() save = new EventEmitter<CrisisPlan>();
  //
  text_validation = '';
  onSave() {
    this.crisis_planChange.emit(this.crisis_plan);
    this.save.emit(this.crisis_plan);
  }
}
