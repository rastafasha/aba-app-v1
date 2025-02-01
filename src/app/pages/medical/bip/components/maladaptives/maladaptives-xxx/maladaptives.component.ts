import { Component } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { HeadRender } from 'src/app/shared/components/list/list.component';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-maladaptives',
  templateUrl: './maladaptives.component.html',
  styleUrls: ['./maladaptives.component.scss'],
})
export class MaladaptivesComponent extends InputDirective<PlanV2[]> {
  newItem = PlanV2.getDefault();
  headRenders: HeadRender<PlanV2> = { description: () => 'Topography' };
}
