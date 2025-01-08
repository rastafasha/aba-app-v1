import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-intervention-view',
  template: `
    <!-- Interventions -->
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Interventions Protocols</h4>
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
                    <span>Token Economy</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.token_economy"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.token_economy"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Generalization</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.generalization"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.generalization"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>NCR</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.NCR" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.NCR" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Behavioral momentum</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.behavioral_momentum"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.behavioral_momentum"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>DRA</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.DRA" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.DRA" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>DRI</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.DRI" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.DRI" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>DRO</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.DRO" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.DRO" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>DRL</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.DRL" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.DRL" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Response Block</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.response_block"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.response_block"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Errorless Teaching</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.errorless_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.errorless_teaching"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Extinction</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.extinction"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.extinction"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Chaining</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.chaining" class="fa fa-check"></i>
                      <i
                        *ngIf="!intervention?.chaining"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Natural Teaching</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.natural_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.natural_teaching"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Redirection</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="intervention?.redirection"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention?.redirection"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Shaping</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.shaping" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.shaping" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Pairing</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.pairing" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.pairing" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Shaping</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i *ngIf="intervention?.shaping" class="fa fa-check"></i>
                      <i *ngIf="!intervention?.shaping" class="fa fa-times"></i>
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
export class InterventionViewComponent {
  @Input() intervention;

  updateInterventions() {
    const interventionsObj = this.intervention
      .filter((intervention) => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = true;
        return acc;
      }, {});
  }
}
