import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Outcome } from '../interfaces';

@Component({
  selector: 'app-intakeoutcome',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
  template: `
    <div class="col-12">
      <h5>Intake and Outcome Measures</h5>
      <app-split-table
        [data]="outcomeList"
        [headerTemplate]="headerTemplate"
        [rowTemplate]="rowTemplate">
        <ng-template #headerTemplate>
          <thead style="break-inside: avoid;">
            <tr>
              <th>please check as needed</th>
              <th>Select</th>
            </tr>
          </thead>
        </ng-template>

        <ng-template #rowTemplate let-intakeoutcome>
          <td>{{ intakeoutcome.name }}</td>
          <td>
            <div class="status-toggle d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                [id]="intakeoutcome.id"
                class="check"
                [(ngModel)]="intakeoutcome.value"
                [name]="intakeoutcome.id"
                (ngModelChange)="updateIntakeOutcomes()"
              />
              <label [for]="intakeoutcome.id" class="checktoggle">checkbox</label>
            </div>
          </td>
        </ng-template>
      </app-split-table>
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
