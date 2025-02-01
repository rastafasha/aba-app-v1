import { Component, Input } from '@angular/core';
import { Objective, OBJECTIVE_STATUS_MAP } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-objective-form',
  templateUrl: './objective-form.component.html',
  styleUrls: ['./objective-form.component.scss'],
})
export class ObjectiveFormComponent extends InputDirective<Objective> {
  @Input() title = 'Objective';
  states = OBJECTIVE_STATUS_MAP;
}
