import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BipV2, DocumentV2, Medication } from 'src/app/core/models';

@Component({
  selector: 'app-behavior-analysis-assessment',
  templateUrl: './behavior-analysis-assessment.component.html',
  styleUrls: ['./behavior-analysis-assessment.component.scss'],
})
export class BehaviorAnalysisAssessmentComponent {
  @Input() bip: BipV2;
  @Output() bipChange = new EventEmitter<BipV2>();
  @Output() save = new EventEmitter<BipV2>();
  //
  newDocument = DocumentV2.getDefault();
  newMedication = Medication.getDefault();

  onSave() {
    this.save.emit();
  }
}
