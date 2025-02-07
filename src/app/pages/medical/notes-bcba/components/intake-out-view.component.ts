import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-intakeoutcome-view',
  template: `
   <div class="card">
      <div class="card-header">
        <h4 class="card-title">Intake and Outcome Measures</h4>
      </div>
      <!-- body card -->
      <div class="card-body p-0">
      <div class="table-responsive content-box">
          <table class="table mb-0 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
            <tr *ngFor="let intake of intake_outcome; let i = index">
              <td>{{ intake.name }}</td>
              <td>
              <i  *ngIf="intake.value === true"><i class="fa fa-check"  ></i></i>
              <i  *ngIf="intake.value === false"><i class="fa fa-times"  ></i></i>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class IntakeOutcomeViewComponent {
  @Input() intake_outcome;

}
