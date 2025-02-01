import { Component } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-crisis-plan-edit',
  templateUrl: './crisis-plan-edit.component.html',
  styleUrls: ['./crisis-plan-edit.component.scss'],
})
export class CrisisPlanEditComponent extends InputDirective<CrisisPlanV2> {}
