import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteBcbaService } from 'src/app/core/services/notes-bcba.service';
import { NoteRbtService } from 'src/app/core/services/notes-rbt.service';
import Swal from 'sweetalert2';

export interface AISummaryData {
  diagnosis: string;
  birthDate: string | null;
  startTime: string | null;
  endTime: string | null;
  startTime2: string | null;
  endTime2: string | null;
  mood?: string;
  pos: string;
  maladaptives?: Array<{behavior: string; frequency: number}>;
  replacements?: Array<{name: string; totalTrials: number; correctResponses: number}>;
  caregiverGoals?: Array<{goal: string; percentCorrect: number}>;
  rbtTrainingGoals?: Array<{goal: string; percentCorrect: number}>;
  participants?: string;
  noteDescription?: string;
  // BCBA specific fields
  cptCode?: string;
  environmentalChanges?: string;
  clientAppeared?: string;
  evidencedBy?: string;
  rbtModeledAndDemonstrated?: string;
  clientResponse?: string;
  progressNoted?: string;
  nextSession?: string;
  reinforcedCaregiverStrengths?: string;
  constructiveFeedback?: string;
  recommendedPractice?: string;
  // 97151 specific fields
  cpt51type?: 'observation' | 'report';
  procedure?: string;
  instruments?: string;
  intakeAndOutcomeMeasurements?: string;
  // 97153 specific fields
  interventions?: string[];
  // 97155 specific fields
  interventionProtocols?: string;
  replacementProtocols?: string;
  modificationsNeededAtThisTime?: boolean;
  additionalGoalsOrInterventions?: string;
}

@Component({
  selector: 'app-generate-ai-summary',
  template: `
    <button
      class="btn btn-primary btn-sm"
      (click)="generateSummary()"
      [disabled]="isGenerating">
      {{ isGenerating ? "Generating..." : "Generate AI Summary" }}
    </button>
  `
})
export class GenerateAiSummaryComponent {
  @Input() type: 'rbt' | 'bcba' = 'rbt';
  @Input() summaryData: AISummaryData;
  @Output() summaryGenerated = new EventEmitter<string>();

  isGenerating = false;

  constructor(
    private noteRbtService: NoteRbtService,
    private noteBcbaService: NoteBcbaService
  ) {}

  private validateData(): { isValid: boolean; missingFields: string[] } {
    const missingFields: string[] = [];

    // Common validations for all types
    if (!this.summaryData.diagnosis) missingFields.push('Diagnosis');
    if (!this.summaryData.pos) missingFields.push('Location (POS)');

    const hasTime1 = this.summaryData.startTime && this.summaryData.endTime;
    const hasTime2 = this.summaryData.startTime2 && this.summaryData.endTime2;
    if (!hasTime1 && !hasTime2) missingFields.push('Session Time');

    if (this.type === 'bcba') {
      switch (this.summaryData.cptCode) {
        case '97151':
          // Assessment validations
          if (!this.summaryData.cpt51type) {
            missingFields.push('Assessment Type (Observation/Report)');
          }
          if (this.summaryData.cpt51type === 'observation') {
            if (!this.summaryData.procedure?.length) {
              missingFields.push('Assessment Procedures');
            }
            if (!this.summaryData.instruments?.length) {
              missingFields.push('Assessment Instruments');
            }
            if (!this.summaryData.intakeAndOutcomeMeasurements?.length) {
              missingFields.push('Intake and Outcome Measurements');
            }
          }
          break;

        case '97155':
          // Protocol modification validations
          break;

        case '97156':
          // Caregiver training validations
          if (!this.summaryData.caregiverGoals?.length) {
            missingFields.push('Caregiver Goals');
          }
          if (!this.summaryData.environmentalChanges) {
            missingFields.push('Environmental Changes');
          }
          if (!this.summaryData.nextSession) {
            missingFields.push('Next Session Information');
          }
          break;

        case '97153':
          // Direct treatment validations
          if (!this.summaryData.environmentalChanges) {
            missingFields.push('Environmental Changes');
          }
          if (!this.summaryData.clientAppeared) {
            missingFields.push('Client Appearance');
          }
          if (!this.summaryData.evidencedBy) {
            missingFields.push('Evidence');
          }
          if (!this.summaryData.clientResponse) {
            missingFields.push('Client Response');
          }
          if (!this.summaryData.progressNoted) {
            missingFields.push('Progress Notes');
          }
          if (!this.summaryData.nextSession) {
            missingFields.push('Next Session Information');
          }
          break;
      }
    } else {
      // RBT validations remain the same
      if (!this.summaryData.maladaptives?.length) {
        missingFields.push('Maladaptive Behaviors');
      } else {
        const invalidMaladaptives = this.summaryData.maladaptives.some(
          m => !m.behavior || m.frequency === undefined || m.frequency === null
        );
        if (invalidMaladaptives) missingFields.push('Complete Maladaptive Behavior Data');
      }

      if (!this.summaryData.replacements?.length) {
        missingFields.push('Replacement Behaviors');
      } else {
        const invalidReplacements = this.summaryData.replacements.some(
          r => !r.name || r.totalTrials === undefined || r.correctResponses === undefined
        );
        if (invalidReplacements) missingFields.push('Complete Replacement Behavior Data');
      }

      if (!this.summaryData.interventions?.length) {
        missingFields.push('Interventions');
      }
    }

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }

  generateSummary() {
    const validationResult = this.validateData();
    if (!validationResult.isValid) {
      const missingFieldsList = validationResult.missingFields.join('\n• ');
      Swal.fire(
        'Warning',
        `Please complete the following required fields for ${this.type === 'bcba' ? `CPT ${this.summaryData.cptCode}` : 'RBT'} note:\n\n• ${missingFieldsList}`,
        'warning'
      );
      return;
    }

    this.isGenerating = true;
    const service = this.type === 'rbt' ? this.noteRbtService : this.noteBcbaService;

    // Prepare data based on type and CPT code
    const summaryData = this.type === 'bcba' ? this.prepareBcbaData() : this.summaryData;
    console.log(summaryData, 'summaryData sent')

    service.generateAISummary({...summaryData, pos: this.getPos(this.summaryData.pos)}).subscribe(
      (response: any) => {
        this.summaryGenerated.emit(response.summary);
        this.isGenerating = false;
      },
      (error) => {
        console.error('Error generating AI summary:', error);
        Swal.fire(
          'Error',
          'Error generating AI summary. Please try again.',
          'error'
        );
        this.isGenerating = false;
      }
    );
  }

  private prepareBcbaData(): AISummaryData {
    // Common fields
    const preparedData: AISummaryData = {
      diagnosis: this.summaryData.diagnosis,
      birthDate: this.summaryData.birthDate,
      startTime: this.summaryData.startTime,
      endTime: this.summaryData.endTime,
      startTime2: this.summaryData.startTime2,
      endTime2: this.summaryData.endTime2,
      pos: this.summaryData.pos,
      cptCode: this.summaryData.cptCode
    };

    console.log(this.summaryData, 'summaryData')

    // CPT-specific fields
    switch (this.summaryData.cptCode) {
      case '97151':
        if (this.summaryData.cpt51type === 'observation') {
          Object.assign(preparedData, {
            cpt51type: 'observation',
            procedure: this.summaryData.procedure,
            instruments: this.summaryData.instruments,
            intakeAndOutcomeMeasurements: this.summaryData.intakeAndOutcomeMeasurements
          });
        } else {
          Object.assign(preparedData, {
            cpt51type: 'report',
            procedure: this.summaryData.procedure
          });
        }
        break;

      case '97155':
        Object.assign(preparedData, {
          interventionProtocols: this.summaryData.interventionProtocols,
          replacementProtocols: this.summaryData.replacementProtocols,
          modificationsNeededAtThisTime: this.summaryData.modificationsNeededAtThisTime,
          additionalGoalsOrInterventions: this.summaryData.additionalGoalsOrInterventions
        });
        break;

      case '97156':
        Object.assign(preparedData, {
          caregiverGoals: this.summaryData.caregiverGoals,
          environmentalChanges: this.summaryData.environmentalChanges,
          nextSession: this.summaryData.nextSession
        });
        break;

      case '97153':
        Object.assign(preparedData, {
          environmentalChanges: this.summaryData.environmentalChanges,
          clientAppeared: this.summaryData.clientAppeared,
          evidencedBy: this.summaryData.evidencedBy,
          clientResponse: this.summaryData.clientResponse,
          progressNoted: this.summaryData.progressNoted,
          nextSession: this.summaryData.nextSession
        });
        break;
    }

    return preparedData;
  }

  private getPos(posCode: string): string {
    switch (posCode) {
      case '03':
        return 'School';
      case '12':
        return 'Home';
      case '02':
        return 'Telehealth';
      case '99':
        return 'Other';
      default:
        return 'Unknown';
    }
  }
}
