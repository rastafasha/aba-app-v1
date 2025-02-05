import { Component } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { OnPlansEdit } from '../../on-plans-edit/on-plans-edit';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.scss'],
})
export class FamilyEditComponent extends OnPlansEdit {
  protected newGoal: PlanV2 = {
    ...PlanV2.getDefault(),
    category: 'caregiver_training',
  };
  options = this.defaultOptions;
  displayedColumns: (keyof PlanV2)[] = ['description'];

  onDataSourceChange(data: PlanV2[]) {
    this.input = data;
    this.inputChange.emit(this.input);
  }
}
