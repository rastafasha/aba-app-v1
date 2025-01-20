import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-replacements',
  template: `
    <div class="col-12">
      <h4>Replacements</h4>
      <p class="text">Note: Please fill out all fields. If the treatment has not started, enter "0"</p>
    </div>
    <div class="container">
      <form autocomplete="false">
        <div class="row">
          <ng-container *ngFor="let replacement of replacements; let i = index">
            <div class="col-xs-12 col-sm-3 graphic-value">
              <div class="tope_replacement" style="height: 160px">
                <div class="title" style="height: 120px">
                  <h4 class="label" style="height: 55px; overflow: hidden" [tooltip]="replacement.name">{{replacement.name}}</h4>
                  <div class="text-center" style="font-size: 18px;">
                    {{(replacement.number_of_correct_response * 100 / replacement.total_trials) | number:'1.0-0'}}%
                  </div>
                </div>
                <div class="targetsect" *ngIf="target">
                  <h4 class="label">Target:</h4>
                  <p class="text-center">
                    <span class="badge bg-success">{{ target }}</span>
                  </p>
                </div>
                <b><span *ngIf="!target && replacement.target" style="font-size: 20px;"> Target: </span> </b>
                <span *ngIf="!target && replacement.target" style="font-size: 20px;">{{replacement.target }}</span>
              </div>
              <label for="" class="mt-2">Total Trials:</label>
              <input class="form-control"
                     name="total_trials"
                     [(ngModel)]="replacement.total_trials"
                     type="number"
                     min="0"
                     required
                     [ngClass]="{'is-valid': replacement.total_trials > 0, 'is-invalid': replacement.total_trials <= 0 || replacement.total_trials === undefined}">
              <label for="" class="mt-1">Correct response</label>
              <input class="form-control"
                     name="number_of_correct_response"
                     [(ngModel)]="replacement.number_of_correct_response"
                     type="number"
                     min="0"
                     [max]="replacement.total_trials"
                     required
                     [ngClass]="{'is-valid': isValidCorrectResponse(replacement), 'is-invalid': !isValidCorrectResponse(replacement)}">
            </div>
              <hr *ngIf="(i+1)%4 === 0" class="mt-4 mb-4">
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

  isValidCorrectResponse(replacement: any): boolean {
    return replacement.number_of_correct_response !== undefined &&
           replacement.number_of_correct_response >= 0 &&
           replacement.number_of_correct_response <= replacement.total_trials;
  }
}
