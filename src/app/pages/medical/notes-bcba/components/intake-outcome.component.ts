import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-intakeoutcome',
  template: `
    <div class="col-12">
                    <h5>Intake and Outcome Measures:</h5>
                    <div class="table-responsive content-box">
                      <table class="table mb-0 ">
                        <thead>
                          <tr>
                            <th>please check as needed</th>
                            <th>Option</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr *ngFor="let itemOC of outcomeList; let i = index">
                            <td>{{ itemOC.name }}</td>
                            <td>
                              <!-- <input class="form-check-input" type="checkbox" id="Assessed" value="Assessed" checked aria-label="..."> -->
                              <div class="status-toggle d-flex justify-content-between align-items-center">
                                <input type="checkbox" [id]="itemOC.id" class="check"
                                       [(ngModel)]="itemOC.value"
                                       [name]="itemOC.id"
                                       >
                                       <!-- (ngModelChange)="updateitemOCs()" -->
                                <label [for]="itemOC.id" class="checktoggle">checkbox</label>
    
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
  @Input() outcomeList: any[];
  @Output() intakeoutcomeChange = new EventEmitter<any>();

  updateIntakeOutcomes() {
    const intakeoutcomesObj = this.outcomeList
      .filter((intakeoutcome) => intakeoutcome.value)
      .reduce((acc, intakeoutcome) => {
        acc[intakeoutcome.id] = true;
        return acc;
      }, {});
    this.intakeoutcomeChange.emit([intakeoutcomesObj]);
  }
}
