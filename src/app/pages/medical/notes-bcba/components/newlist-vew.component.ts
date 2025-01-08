import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-newlist-view',
  template: `
    <!-- Interventions -->
    <div class="card">
      <div class="card-header">
        <!-- <h4 class="card-title">Interventions Protocols</h4> -->
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
                    <span>FAST</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="newlist?.FAST"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!newlist?.FAST"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>MAST</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="newlist?.MAST"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!newlist?.MAST"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>QABF</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="newlist?.QABF" class="fa fa-check"></i>
                      <i *ngIf="!newlist?.QABF" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>ABC data collection</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="newlist?.ABC_data_collection"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!newlist?.ABC_data_collection"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>VBmapp</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="newlist?.VBmapp" class="fa fa-check"></i>
                      <i *ngIf="!newlist?.VBmapp" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Ablls</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="newlist?.Ablls" class="fa fa-check"></i>
                      <i *ngIf="!newlist?.Ablls" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>EFL</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="newlist?.EFL" class="fa fa-check"></i>
                      <i *ngIf="!newlist?.EFL" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Peak</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="newlist?.Peak" class="fa fa-check"></i>
                      <i *ngIf="!newlist?.Peak" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Parent Interview</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="newlist?.parent_interview"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!newlist?.parent_interview"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Reinforcement questionnaire</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="newlist?.reinforcement_questionnaire"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!newlist?.reinforcement_questionnaire"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Preference assessment</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="newlist?.preference_assessment"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!newlist?.preference_assessment"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Other</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="newlist?.other" class="fa fa-check"></i>
                      <i
                        *ngIf="!newlist?.other"
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
    <!-- Interventions -->
  `,
})
export class NewlistViewComponent {
  @Input() newlist;

  updateInterventions() {
    const newlistsObj = this.newlist
      .filter((newlist) => newlist.value)
      .reduce((acc, newlist) => {
        acc[newlist.id] = true;
        return acc;
      }, {});
  }
}
