import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Outcome } from '../interfaces';

@Component({
  selector: 'app-intakeoutcome',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
  template: `
    <div class="col-12">
      <h5>Intake and Outcome Measures</h5>
      <div class="table-responsive content-box">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let intakeoutcome of outcomeList; let i = index">
              <td>{{ intakeoutcome.name }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="intakeoutcome.id"
                    class="check"
                    [(ngModel)]="intakeoutcome.value"
                    [name]="intakeoutcome.id"
                    (ngModelChange)="updateIntakeOutcomes()"
                  />
                  <label [for]="intakeoutcome.id" class="checktoggle"
                    >checkbox</label
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class IntakeOutcomeComponent {
  @Input() outcomeList: Outcome[];
  @Output() intakeoutcomeChange = new EventEmitter<object>();

  updateIntakeOutcomes() {
    const intakeoutcomesObj = this.outcomeList
      .filter((intakeoutcome) => intakeoutcome.value)
      .reduce((acc, intakeoutcome) => {
        acc[intakeoutcome.id] = {
          id: intakeoutcome.id,
          option: !!intakeoutcome.value,
        };
        return acc;
      }, {});
    console.log(intakeoutcomesObj);
    this.intakeoutcomeChange.emit([intakeoutcomesObj]);
  }
}
