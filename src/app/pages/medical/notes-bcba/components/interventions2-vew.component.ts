import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-intervention2-view',
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
                        *ngIf="intervention2?.token_economy"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.token_economy"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.token_economy"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.token_economy"
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
                        *ngIf="intervention2?.generalization"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.generalization"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.generalization"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.generalization"
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
                      <i *ngIf="intervention2?.NCR" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.NCR" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.NCR" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.NCR" class="fa fa-times"></i>
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
                        *ngIf="intervention2?.behavioral_momentum"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.behavioral_momentum"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.behavioral_momentum"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.behavioral_momentum"
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
                      <i *ngIf="intervention2?.DRA" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.DRA" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.DRA" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.DRA" class="fa fa-times"></i>
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
                      <i *ngIf="intervention2?.DRI" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.DRI" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.DRI" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.DRI" class="fa fa-times"></i>
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
                      <i *ngIf="intervention2?.DRO" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.DRO" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.DRO" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.DRO" class="fa fa-times"></i>
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
                      <i *ngIf="intervention2?.DRL" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.DRL" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.DRL" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.DRL" class="fa fa-times"></i>
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
                        *ngIf="intervention2?.response_block"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.response_block"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.response_block"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.response_block"
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
                        *ngIf="intervention2?.errorless_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.errorless_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.errorless_teaching"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.errorless_teaching"
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
                        *ngIf="intervention2?.extinction"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.extinction"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.extinction"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.extinction"
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
                      <i *ngIf="intervention2?.chaining" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.chaining" class="fa fa-check"></i>
                      <i
                        *ngIf="!intervention2?.chaining"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.chaining"
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
                        *ngIf="intervention2?.natural_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.natural_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.natural_teaching"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.natural_teaching"
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
                        *ngIf="intervention2?.redirection"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="intervention2?.redirection"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!intervention2?.redirection"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!intervention2?.redirection"
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
                      <i *ngIf="intervention2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.shaping" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.shaping" class="fa fa-times"></i>
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
                      <i *ngIf="intervention2?.pairing" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.pairing" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.pairing" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.pairing" class="fa fa-times"></i>
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
                      <i *ngIf="intervention2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="intervention2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="!intervention2?.shaping" class="fa fa-times"></i>
                      <i *ngIf="!intervention2?.shaping" class="fa fa-times"></i>
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
export class Intervention2ViewComponent {
  @Input() intervention2;

  updateInterventions() {
    const intervention2sObj = this.intervention2
      .filter((intervention2) => intervention2.value)
      .reduce((acc, intervention2) => {
        acc[intervention2.id] = true;
        return acc;
      }, {});
  }
}
