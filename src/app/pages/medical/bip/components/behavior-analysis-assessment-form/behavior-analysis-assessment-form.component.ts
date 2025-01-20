import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BipV2 } from 'src/app/core/models';

@Component({
  selector: 'app-behavior-analysis-assessment-form',
  templateUrl: './behavior-analysis-assessment-form.component.html',
  styleUrls: ['./behavior-analysis-assessment-form.component.scss'],
})
export class BehaviorAnalysisAssessmentFormComponent {
  @Input() input: BipV2;
  @Output() inputChange = new EventEmitter<BipV2>();
}
