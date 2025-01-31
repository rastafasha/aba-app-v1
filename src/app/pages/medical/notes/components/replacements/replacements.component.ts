import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ObjectivesStatusEnum } from "../../models/objectives-status.enum";
import { ReplacementService } from "../../services/replacement.service";

@Component({
  selector: 'app-replacements',
  styleUrls: ['../../edit-note-rbt/edit-note-rbt.component.scss'],
  styles: [
    `
      .description {
        font-size: 12px;
        line-height: 1.4;
        display: block;
        background-color: #f0f0f0;
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #ddd;
        margin-top: 8px;
        word-wrap: break-word;
      }

      .replacement-card {
        margin-bottom: 24px;
        height: 100%;
      }

      .tope_replacement {
        background-color: #fff;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #ccc;
        // box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        height: 100%;
      }

      .card-header {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
      }

      .card-header h4 {
        font-size: 16px;
        line-height: 1.4;
        margin-bottom: 12px;
        min-height: 45px;
      }

      .percentage {
        font-size: 24px;
        font-weight: 600;
        color: #2c3e50;
      }

      .form-group {
        margin-bottom: 4px;
      }

      .form-label {
        margin-bottom: 8px;
        display: block;
        color: #4a5568;
      }

      .card-body {
        margin-top: 16px;
      }
    `
  ],
  template: `
    <div class="col-12 mb-4">
      <h4>Replacements</h4>
      <p class="text">Note: Please fill out all fields. If the treatment has not started, enter "0"</p>
    </div>
    <div class="container">
      <form autocomplete="false">
        <div class="row g-4">
          <ng-container *ngFor="let replacement of replacements; let i = index">
            <div class="col-12 col-sm-6 col-xl-4">
              <div class="replacement-card">
                <div class="tope_replacement">
                  <div class="card-header">
                    <h4 [tooltip]="replacement.name">{{replacement.name}}</h4>
                    <div class="percentage text-center">
                      {{(replacement.number_of_correct_response * 100 / replacement.total_trials) | number:'1.0-0'}}%
                    </div>
                  </div>

                  <div class="targetsect" *ngIf="target">
                    <p class="text-center mb-0">
                      <span class="badge bg-success">{{ replacement.description }}</span>
                    </p>
                  </div>

                  <div *ngIf="!target && replacement.target" class="description">
                    {{replacement.description }}
                  </div>

                  <div class="card-body">
                    <div class="form-group">
                      <label class="form-label">Total Trials:</label>
                      <input class="form-control"
                             name="total_trials"
                             [(ngModel)]="replacement.total_trials"
                             type="number"
                             min="0"
                             required
                             [ngClass]="{'is-valid': replacement.total_trials > 0, 'is-invalid': replacement.total_trials <= 0 || replacement.total_trials === undefined}">
                    </div>

                    <div class="form-group">
                      <label class="form-label">Correct response</label>
                      <input class="form-control"
                             name="number_of_correct_response"
                             [(ngModel)]="replacement.number_of_correct_response"
                             type="number"
                             min="0"
                             [max]="replacement.total_trials"
                             required
                             [ngClass]="{'is-valid': isValidCorrectResponse(replacement), 'is-invalid': !isValidCorrectResponse(replacement)}">
                    </div>

                    <app-alert
                      [title]="getTitle(replacement)"
                      [type]="'warning'"
                      [content]="highPercentageWarning"
                      *ngIf="
                        (replacement.number_of_correct_response * 100 / replacement.total_trials) > (replacement.expectedPercentaje + 10)
                        && !!replacement.number_of_correct_response
                        && !!replacement.total_trials
                      "
                    ></app-alert>

                    <app-alert
                      [title]="getTitle(replacement)"
                      [type]="'warning'"
                      [content]="lowPercentageWarning"
                      *ngIf="
                        (replacement.number_of_correct_response * 100 / replacement.total_trials) < (replacement.expectedPercentaje - 10)
                        && !!replacement.number_of_correct_response
                        && !!replacement.total_trials
                      "
                    ></app-alert>
                  </div>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </form>
    </div>
  `
})
export class ReplacementsComponent {
  @Input() replacements: any[];
  @Input() target: number | string;
  @Output() replacementsChange = new EventEmitter<any[]>();

  public highPercentageWarning = "It looks like this data is above the projections outlined in the BIP. Please provide a reason under 'Environmental Changes' and consult with your supervisor for any necessary protocol modifications.";
  public lowPercentageWarning = "It looks like this data is below the projections outlined in the BIP. Please check in with your BCBA for further guidance.";

  constructor( private replacementService: ReplacementService ){}

  ngOnChanges(): void {
    if(this.replacements.length > 0) {
      this.setExpectedPercentajesInReplacements();
    }
  }

  isValidCorrectResponse(replacement: any): boolean {
    return replacement.number_of_correct_response !== undefined &&
           replacement.number_of_correct_response >= 0 &&
           replacement.number_of_correct_response <= replacement.total_trials;
  }

  public setExpectedPercentajesInReplacements(): void {
    this.replacements.forEach(rep => {
      let objectiveInProgess = null;
      objectiveInProgess = rep.objectives.find(obj => obj.status === ObjectivesStatusEnum.inProgress)
      if (objectiveInProgess) {
        rep['expectedPercentaje'] = this.replacementService.getEstimatedPercentaje(objectiveInProgess.initial_date, objectiveInProgess.target);
        rep['target'] = objectiveInProgess.target
      }
    })
  }

  public getTitle(replacement: any): string {
    return `Expected range:
              ${(replacement.expectedPercentaje > 10 ? replacement.expectedPercentaje - 10 : 0).toFixed(0)}% -
              ${(replacement.expectedPercentaje + 10).toFixed(0)}%`
  }
}
