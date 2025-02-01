import { Component } from '@angular/core';
import { BipV2, DocumentV2, Medication } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-behavior-analysis-assessment',
  templateUrl: './behavior-analysis-assessment.component.html',
  styleUrls: ['./behavior-analysis-assessment.component.scss'],
})
export class BehaviorAnalysisAssessmentComponent extends InputDirective<BipV2> {
  newDocument = DocumentV2.getDefault();
  newMedication = Medication.getDefault();
}
