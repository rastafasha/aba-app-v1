import { Component } from '@angular/core';
import { BipV2, TYPE_OF_ASSESSMENT_MAP } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-behavior-analysis-assessment-form',
  templateUrl: './behavior-analysis-assessment-form.component.html',
  styleUrls: ['./behavior-analysis-assessment-form.component.scss'],
})
export class BehaviorAnalysisAssessmentFormComponent extends InputDirective<BipV2> {
  assessments_types = TYPE_OF_ASSESSMENT_MAP;
}
