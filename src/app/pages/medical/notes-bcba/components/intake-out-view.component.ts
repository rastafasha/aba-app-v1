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
        <div class="personal-list-out">
          <div class="container">
            <div class="col-xs-12">
              <div class="row">
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>SRS_2</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="outcomeList?.SRS_2"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!outcomeList?.SRS_2"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>vineland_3</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="outcomeList?.vineland_3"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!outcomeList?.vineland_3"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>PDDBI</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="outcomeList?.PDDBI"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!outcomeList?.PDDBI"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>PSI_4_short_form</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="outcomeList?.PSI_4_short_form"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!outcomeList?.PSI_4_short_form"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class IntakeOutcomeViewComponent {
  @Input() outcomeList: any;

  updateIntakeOutcomes() {
    const outcomeListObj = this.outcomeList
      .filter((outcomeList) => outcomeList.value)
      .reduce((acc, outcomeList) => {
        acc[outcomeList.id] = true;
        return acc;
      }, {});
  }
}
