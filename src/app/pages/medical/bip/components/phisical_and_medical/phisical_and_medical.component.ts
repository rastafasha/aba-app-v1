import { Component } from '@angular/core';
import { Medication } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-phisical-and-medical',
  templateUrl: './phisical_and_medical.component.html',
  styleUrls: ['./phisical_and_medical.component.scss'],
})
export class PhisicalAndMedicalComponent extends InputDirective<Medication> {}
