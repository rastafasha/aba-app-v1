import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssestmentEvaluationSetting, DocumentV2 } from 'src/app/core/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assestment',
  templateUrl: './assestment.component.html',
  styleUrls: ['./assestment.component.scss'],
})
export class AssestmentComponent {
  @Input() assestmentConducted = '';
  @Output() assestmentConductedChange = new EventEmitter<string>();
  //
  @Input() assestmentEvaluationSettings: AssestmentEvaluationSetting[] = [];
  @Output() assestmentEvaluationSettingsChange = new EventEmitter<
    AssestmentEvaluationSetting[]
  >();
  newAssestmentEvaluationSetting = AssestmentEvaluationSetting.getDefault();
  @Input() assesstmentsDocuments: DocumentV2[] = [];
  @Output() assesstmentsDocumentsChange = new EventEmitter<DocumentV2[]>();
  newAssestmentDocument = DocumentV2.getDefault();
  //
  @Output() save = new EventEmitter<void>();
  text_validation = '';

  addEvaluationSettings() {
    if (!this.validate()) {
      this.text_validation = 'Please fill all the fields';
      return;
    }
    this.text_validation = '';
    this.assestmentEvaluationSettings ??= [];
    this.newAssestmentEvaluationSetting.index =
      this.assestmentEvaluationSettings.length + 1;
    this.assestmentEvaluationSettings.push({
      ...this.newAssestmentEvaluationSetting,
    });
    this.newAssestmentEvaluationSetting = {
      index: 0,
      tangible: '',
      activities: '',
      other: '',
    };
    this.assestmentEvaluationSettingsChange.emit(
      this.assestmentEvaluationSettings
    );
  }

  deleteEvaluationSetting(i: number) {
    this.assestmentEvaluationSettings.splice(i, 1);
    this.assestmentEvaluationSettingsChange.emit(
      this.assestmentEvaluationSettings
    );
  }

  updateItemListEvaluationSetting(evaluation: AssestmentEvaluationSetting) {
    const index = this.assestmentEvaluationSettings.findIndex(
      (item) => item.index === evaluation.index
    );
    if (index === -1) {
      Swal.fire('Error', `Item not found, please try again`, 'error');
      return;
    }
    this.assestmentEvaluationSettings[index] = evaluation;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
  }

  seleccionarParaEva(evaluation: AssestmentEvaluationSetting) {
    const selectedEvaluation = this.assestmentEvaluationSettings.find(
      (item) => item.index === evaluation.index
    );
    if (selectedEvaluation) {
      this.newAssestmentEvaluationSetting = selectedEvaluation;
    }
  }
  ////////////////////////////////
  addAssesstmentDocument() {
    if (
      !this.newAssestmentDocument.status ||
      !this.newAssestmentDocument.title
    ) {
      this.text_validation = 'Please fill all the fields';
      return;
    }
    this.assesstmentsDocuments ??= [];
    this.newAssestmentDocument.index = this.assesstmentsDocuments.length + 1;
    this.assesstmentsDocuments.push({
      ...this.newAssestmentDocument,
    });
    this.text_validation = '';
    this.newAssestmentDocument = DocumentV2.getDefault();
    this.assesstmentsDocumentsChange.emit(this.assesstmentsDocuments);
  }

  deleteAssesstmentDocument(i: number) {
    this.assesstmentsDocuments.splice(i, 1);
    this.assesstmentsDocumentsChange.emit(this.assesstmentsDocuments);
  }

  onSave(): void {
    this.save.emit();
  }

  private validate(): boolean {
    return (
      this.newAssestmentEvaluationSetting.tangible &&
      this.newAssestmentEvaluationSetting.activities &&
      !!this.newAssestmentEvaluationSetting.other
    );
  }
}
