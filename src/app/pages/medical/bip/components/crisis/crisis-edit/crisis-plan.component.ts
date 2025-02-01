import { Component } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-crisis-plan-edit',
  templateUrl: './crisis-plan.component.html',
  styleUrls: ['./crisis-plan.component.scss'],
})
export class CrisisPlanComponent extends InputDirective<CrisisPlanV2> {
  state: 'list' | 'edit' = 'list';
  newItem: CrisisPlanV2 = CrisisPlanV2.getDefault();
}
