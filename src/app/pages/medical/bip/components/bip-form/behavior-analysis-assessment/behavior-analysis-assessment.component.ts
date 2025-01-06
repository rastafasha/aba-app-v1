import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medication } from 'src/app/core/models';
import { ListFormStrategy } from '../list-form.strategy';

type Document = { index: number; title: string };

@Component({
  selector: 'app-behavior-analysis-assessment[background_information]',
  templateUrl: './behavior-analysis-assessment.component.html',
  styleUrls: ['./behavior-analysis-assessment.component.scss'],
})
export class BehaviorAnalysisAssessmentComponent {
  @Input() type_of_assessment: number;
  @Output() type_of_assessmentChange = new EventEmitter<number>();
  /////////////////
  @Input() background_information: string;
  @Output() background_informationChange = new EventEmitter<string>();
  /////////////////
  @Input() previus_treatment_and_result: string;
  @Output() previus_treatment_and_resultChange = new EventEmitter<string>();
  /////////////////
  @Input() current_treatment_and_progress: string;
  @Output() current_treatment_and_progressChange = new EventEmitter<string>();
  /////////////////
  @Input() education_status: string;
  @Output() education_statusChange = new EventEmitter<string>();
  /////////////////
  @Input() phisical_and_medical_status: string;
  @Output() phisical_and_medical_statusChange = new EventEmitter<string>();
  /////////////////
  @Input() strengths: string;
  @Output() strengthsChange = new EventEmitter<string>();
  /////////////////
  @Input() weakneses: string;
  @Output() weaknesesChange = new EventEmitter<string>();
  /////////////////
  @Input() phiysical_and_medical: string;
  @Output() phiysical_and_medicalChange = new EventEmitter<string>();

  /////////////////
  @Input() documents: Document[] = [];
  @Output() documentsChange = new EventEmitter<Document[]>();
  newDocument: Document = { index: 0, title: '' };
  documentsStrategy = new ListFormStrategy<Document>(
    this.documentsChange,
    this.newDocument
  );
  newDocumentMessage = '';
  //
  @Input() phisical_and_medical: Medication[] = [];
  @Output() phisical_and_medicalChange = new EventEmitter<Medication[]>();
  newMedication: Medication = {
    index: 0,
    medication: '',
    dose: '',
    frecuency: '',
    reason: '',
    preescribing_physician: '',
  };
  phisical_and_medicalStrategy = new ListFormStrategy<Medication>(
    this.phisical_and_medicalChange,
    this.newMedication
  );
  newMedicationMessage = '';
  //
  @Input() typeOfAssessment: number;

  @Output() save = new EventEmitter<void>();

  private validateDocument = () => {
    return !!(this.newDocument.title || this.newDocument.title.length < 3);
  };
  addDocument() {
    const result = this.documentsStrategy.add(
      this.validateDocument,
      this.documents,
      this.newDocument
    );
    this.newDocumentMessage = result.text
      ? 'The title must have at least 3 characters'
      : '';
    this.documents = result.items;
    this.newDocument = result.item;
  }

  deleteDocument(i: number) {
    this.documents = this.documentsStrategy.delete(i, this.documents);
  }
  ////////////////////////////////////////////////////////////////
  private validateMedication = () => {
    return !!(
      this.newMedication.medication &&
      this.newMedication.dose &&
      this.newMedication.frecuency &&
      this.newMedication.reason &&
      this.newMedication.preescribing_physician
    );
  };
  addMedication() {
    const result = this.phisical_and_medicalStrategy.add(
      this.validateMedication,
      this.phisical_and_medical,
      this.newMedication
    );
    this.newMedicationMessage = result.text;
    this.phisical_and_medical = result.items;
    this.newMedication = result.item;
  }

  deleteMedication(i: number) {
    this.phisical_and_medical = this.phisical_and_medicalStrategy.delete(
      i,
      this.phisical_and_medical
    );
  }

  updateItemListMedications(medication: Medication) {
    this.newMedication = this.phisical_and_medicalStrategy.updateList(
      this.phisical_and_medical,
      medication
    );
  }

  seleccionarParaEditM(medication: Medication) {
    this.newMedication = this.phisical_and_medicalStrategy.select(
      this.phisical_and_medical,
      medication
    );
  }

  onSave() {
    this.save.emit();
  }
}
