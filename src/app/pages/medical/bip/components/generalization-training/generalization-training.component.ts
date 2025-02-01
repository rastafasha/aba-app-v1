import { Component } from '@angular/core';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-generalization-training',
  templateUrl: './generalization-training.component.html',
  styleUrls: ['./generalization-training.component.scss'],
})
export class GeneralizationTrainingComponent extends InputDirective<string> {}
