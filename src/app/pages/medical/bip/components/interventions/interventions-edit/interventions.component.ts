import { Component } from '@angular/core';
import { Intervention } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
})
export class InterventionsComponent extends InputDirective<Intervention[]> {
  newItem: Intervention = Intervention.getDefault();
}
