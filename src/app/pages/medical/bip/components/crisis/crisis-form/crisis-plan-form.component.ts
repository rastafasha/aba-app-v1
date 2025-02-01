import { Component, Input } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-crisis-plan-form',
  templateUrl: './crisis-plan-form.component.html',
})
export class CrisisPlanFormComponent extends InputDirective<CrisisPlanV2> {
  @Input() title = 'Crisis Plan';
}
