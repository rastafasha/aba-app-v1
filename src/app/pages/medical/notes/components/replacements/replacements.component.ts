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
              <div class="tope_replacement">
                <div class="title">
                  <h4 class="label">{{replacement.goal}}</h4>
                  <p class="text-center">
                    {{(replacement.number_of_correct_response * 100 / replacement.total_trials) | number:'1.0-0'}}%
                  </p>
                </div>
                <div class="targetsect">
                  <h4 class="label">Target:</h4>
                  <p class="text-center">
                    <span class="badge bg-success">{{target}}</span>
                  </p>
                </div>
              </div>
              <label for="">Total Trials:</label>
              <input class="form-control"
                     name="total_trials"
                     [(ngModel)]="replacement.total_trials"
                     type="number"
                     min="0"
                     required
                     [ngClass]="{'is-valid': replacement.total_trials > 0, 'is-invalid': replacement.total_trials <= 0 || replacement.total_trials === undefined}">
              <label for="">Correct response</label>
              <input class="form-control"
                     name="number_of_correct_response"
                     [(ngModel)]="replacement.number_of_correct_response"
                     type="number"
                     min="0"
                     [max]="replacement.total_trials"
                     required
                     [ngClass]="{'is-valid': isValidCorrectResponse(replacement), 'is-invalid': !isValidCorrectResponse(replacement)}">
            </div>
          </ng-container>
        </div>
      </form>
    </div>
  `
})
export class ReplacementsComponent {
  @Input() replacements: any[];
  @Input() target: number;
  @Output() replacementsChange = new EventEmitter<any[]>();

  isValidCorrectResponse(replacement: any): boolean {
    return replacement.number_of_correct_response !== undefined &&
           replacement.number_of_correct_response >= 0 &&
           replacement.number_of_correct_response <= replacement.total_trials;
  }
}
