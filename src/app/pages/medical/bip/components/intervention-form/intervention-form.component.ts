import { Component } from '@angular/core';
import { Intervention } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-intervention-form',
  templateUrl: './intervention-form.component.html',
  styleUrls: ['./intervention-form.component.scss'],
})
export class InterventionFormComponent extends InputDirective<Intervention> {}
