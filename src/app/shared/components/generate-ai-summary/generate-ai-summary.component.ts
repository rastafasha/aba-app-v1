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
  // 97156 specific fields
  interventionProtocolsDemonstrated?: string;
}

@Component({
  selector: 'app-generate-ai-summary',
  template: `
    <button
      class="btn btn-primary btn-sm"
      (click)="onGenerateClick()"
      [disabled]="isGenerating">
      {{ isGenerating ? "Generating..." : "Generate AI Summary" }}
    </button>
  `
})
export class GenerateAiSummaryComponent {
  @Input() type: 'rbt' | 'bcba' = 'rbt';
  @Output() summaryGenerated = new EventEmitter<string>();
  @Output() requestData = new EventEmitter<void>();

  isGenerating = false;

  constructor(
    private noteRbtService: NoteRbtService,
    private noteBcbaService: NoteBcbaService
  ) {}

  onGenerateClick() {
    this.requestData.emit();
  }

  generateSummary(summaryData: AISummaryData) {
    const validationResult = this.validateData(summaryData);
    if (!validationResult.isValid) {
      const missingFieldsList = validationResult.missingFields.join('\n• ');
      Swal.fire(
        'Warning',
        `Please complete the following required fields for ${this.type === 'bcba' ? `CPT ${summaryData.cptCode}` : 'RBT'} note:\n\n• ${missingFieldsList}`,
        'warning'
      );
      return;
    }

    this.isGenerating = true;
    const service = this.type === 'rbt' ? this.noteRbtService : this.noteBcbaService;

    // Prepare data based on type and CPT code
    const preparedData = this.type === 'bcba' ? this.prepareBcbaData(summaryData) : summaryData;
    console.log(preparedData, 'summaryData sent')

    service.generateAISummary({...preparedData, pos: this.getPos(summaryData.pos)}).subscribe(
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

  private validateData(summaryData: AISummaryData): { isValid: boolean; missingFields: string[] } {
    const missingFields: string[] = [];

    // Common validations for all types
    if (!summaryData.diagnosis) missingFields.push('Diagnosis');
    if (!summaryData.pos) missingFields.push('Location (POS)');

    const hasTime1 = summaryData.startTime && summaryData.endTime;
    const hasTime2 = summaryData.startTime2 && summaryData.endTime2;
    if (!hasTime1 && !hasTime2) missingFields.push('Session Time');

    if (this.type === 'bcba') {
      switch (summaryData.cptCode) {
        case '97151':
          // Assessment validations
          if (!summaryData.cpt51type) {
            missingFields.push('Assessment Type (Observation/Report)');
          }
          if (summaryData.cpt51type === 'observation') {
            if (!summaryData.procedure?.length) {
              missingFields.push('Assessment Procedures');
            }
            if (!summaryData.instruments?.length) {
              missingFields.push('Assessment Instruments');
            }
            if (!summaryData.intakeAndOutcomeMeasurements?.length) {
              missingFields.push('Intake and Outcome Measurements');
            }
          }
          break;

        case '97155':
          // Protocol modification validations
          break;

        case '97156':
          // Caregiver training validations
          if (!summaryData.caregiverGoals?.length) {
            missingFields.push('Caregiver Goals');
          }
          if (!summaryData.environmentalChanges) {
            missingFields.push('Environmental Changes');
          }
          if (!summaryData.nextSession) {
            missingFields.push('Next Session Information');
          }
          break;

        case '97153':
          // Direct treatment validations
          if (!summaryData.environmentalChanges) {
            missingFields.push('Environmental Changes');
          }
          if (!summaryData.clientAppeared) {
            missingFields.push('Client Appearance');
          }
          if (!summaryData.evidencedBy) {
            missingFields.push('Evidence');
          }
          if (!summaryData.clientResponse) {
            missingFields.push('Client Response');
          }
          if (!summaryData.progressNoted) {
            missingFields.push('Progress Notes');
          }
          if (!summaryData.nextSession) {
            missingFields.push('Next Session Information');
          }
          break;
      }
    } else {
      // RBT validations remain the same
      if (!summaryData.maladaptives?.length) {
        missingFields.push('Maladaptive Behaviors');
      } else {
        const invalidMaladaptives = summaryData.maladaptives.some(
          m => !m.behavior || m.frequency === undefined || m.frequency === null
        );
        if (invalidMaladaptives) missingFields.push('Complete Maladaptive Behavior Data');
      }

      if (!summaryData.replacements?.length) {
        missingFields.push('Replacement Behaviors');
      } else {
        const invalidReplacements = summaryData.replacements.some(
          r => !r.name || r.totalTrials === undefined || r.correctResponses === undefined
        );
        if (invalidReplacements) missingFields.push('Complete Replacement Behavior Data');
      }

      if (!summaryData.interventions?.length) {
        missingFields.push('Interventions');
      }
    }

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }

  private prepareBcbaData(summaryData: AISummaryData): AISummaryData {
    // Common fields
    const preparedData: AISummaryData = {
      diagnosis: summaryData.diagnosis,
      birthDate: summaryData.birthDate,
      startTime: summaryData.startTime,
      endTime: summaryData.endTime,
      startTime2: summaryData.startTime2,
      endTime2: summaryData.endTime2,
      pos: summaryData.pos,
      cptCode: summaryData.cptCode
    };

    console.log(summaryData, 'summaryData')

    // CPT-specific fields
    switch (summaryData.cptCode) {
      case '97151':
        if (summaryData.cpt51type === 'observation') {
          Object.assign(preparedData, {
            cpt51type: 'observation',
            procedure: summaryData.procedure,
            instruments: summaryData.instruments,
            intakeAndOutcomeMeasurements: summaryData.intakeAndOutcomeMeasurements
          });
        } else {
          Object.assign(preparedData, {
            cpt51type: 'report',
            procedure: summaryData.procedure
          });
        }
        break;

      case '97155':
        Object.assign(preparedData, {
          interventionProtocols: summaryData.interventionProtocols,
          replacementProtocols: summaryData.replacementProtocols,
          modificationsNeededAtThisTime: summaryData.modificationsNeededAtThisTime,
          additionalGoalsOrInterventions: summaryData.additionalGoalsOrInterventions
        });
        break;

      case '97156':
        Object.assign(preparedData, {
          caregiverGoals: summaryData.caregiverGoals,
          environmentalChanges: summaryData.environmentalChanges,
          nextSession: summaryData.nextSession
        });
        break;

      case '97153':
        Object.assign(preparedData, {
          environmentalChanges: summaryData.environmentalChanges,
          clientAppeared: summaryData.clientAppeared,
          evidencedBy: summaryData.evidencedBy,
          clientResponse: summaryData.clientResponse,
          progressNoted: summaryData.progressNoted,
          nextSession: summaryData.nextSession
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
