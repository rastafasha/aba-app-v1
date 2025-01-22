import { Component, Input } from '@angular/core';
import { GeneralizationTraining } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-generalization-training-form',
  templateUrl: './generalization-training-form.component.html',
  styleUrls: ['./generalization-training-form.component.scss'],
})
export class GeneralizationTrainingFormComponent extends InputDirective<GeneralizationTraining> {
  @Input() title = 'Generalization Training';
}
