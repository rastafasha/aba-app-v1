import { Component } from '@angular/core';
import { Intervention } from 'src/app/core/models/v2/intervention.v2.model';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-interventions-show',
  templateUrl: './interventions-show.component.html',
  styleUrls: ['./interventions-show.component.scss'],
})
export class BipProfileInterventionsComponent extends InputDirective<
  Intervention[]
> {}
