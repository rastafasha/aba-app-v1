import { Component, EventEmitter, Input, Output } from '@angular/core';

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
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>SRS-2</td>
                <td>
                <i *ngIf="intake_outcome?.SRS_2?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="intake_outcome?.SRS_2?.option === false "  class="fa fa-times" ></i>
                </td>
                
              </tr>
              <tr >
                <td>vineland-3</td>
                <td>
                <i *ngIf="intake_outcome?.vineland_3?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="intake_outcome?.vineland_3?.option === false "  class="fa fa-times" ></i>
                </td>
                
              </tr>
              <tr >
                <td>PDDBI</td>
                <td>
                <i *ngIf="intake_outcome?.PDDBI?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="intake_outcome?.PDDBI?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>PSI-4 short form</td>
                <td>
                <i *ngIf="intake_outcome?.PSI_4_short_form?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="intake_outcome?.PSI_4_short_form?.option === false "  class="fa fa-times" ></i>
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
  @Input() intake_outcome: any;

  // ngOnInit(): void {
  //   console.log('intake_outcome', this.intake_outcome); // Verifica que la data esté siendo recibida
  // }

  updateIntakeOutcomes() {
    const outcomeListObj = this.intake_outcome
      .filter((intake_outcome) => intake_outcome.value)
      .reduce((acc, intake_outcome) => {
        acc[intake_outcome.id] = true;
        return acc;
      }, {});
  }
}
