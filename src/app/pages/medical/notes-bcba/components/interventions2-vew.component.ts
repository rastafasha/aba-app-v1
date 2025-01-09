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
        <div class="table-responsive content-box">
          <table class="table mb-0 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Assessed</th>
                <th>Modified</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>Token Economy</td>
                <td>
                <i *ngIf="interventions2?.token_economy.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.token_economy.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.token_economy.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.token_economy.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Generalization</td>
                <td>
                <i *ngIf="interventions2?.generalization.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.generalization.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.generalization.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.generalization.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>NCR</td>
                <td>
                <i *ngIf="interventions2?.NCR.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.NCR.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.NCR.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.NCR.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Behavioral Momentum</td>
                <td>
                <i *ngIf="interventions2?.behavioral_momentum.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.behavioral_momentum.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.behavioral_momentum.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.behavioral_momentum.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRA</td>
                <td>
                <i *ngIf="interventions2?.DRA.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRA.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.DRA.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRA.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRI</td>
                <td>
                <i *ngIf="interventions2?.DRI.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRI.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.DRI.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRI.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRO</td>
                <td>
                <i *ngIf="interventions2?.DRO.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRO.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.DRO.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRO.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRL</td>
                <td>
                <i *ngIf="interventions2?.DRL.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRL.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.DRL.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.DRL.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Response Block</td>
                <td>
                <i *ngIf="interventions2?.response_block.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.response_block.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.response_block.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.response_block.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Errorless Teaching</td>
                <td>
                <i *ngIf="interventions2?.errorless_teaching.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.errorless_teaching.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.errorless_teaching.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.errorless_teaching.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Extinction</td>
                <td>
                <i *ngIf="interventions2?.extinction.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.extinction.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.extinction.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.extinction.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Chaining</td>
                <td>
                <i *ngIf="interventions2?.chaining.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.chaining.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.chaining.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.chaining.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Natural Teaching</td>
                <td>
                <i *ngIf="interventions2?.natural_teaching.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.natural_teaching.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.natural_teaching.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.natural_teaching.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Redirection</td>
                <td>
                <i *ngIf="interventions2?.redirection.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.redirection.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.redirection.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.redirection.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Shaping</td>
                <td>
                <i *ngIf="interventions2?.shaping.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.shaping.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.shaping.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.shaping.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Pairing</td>
                <td>
                <i *ngIf="interventions2?.pairing.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.pairing.assessed === false "  class="fa fa-times" ></i>
                </td>
                <td>
                <i *ngIf="interventions2?.pairing.modified === true" class="fa fa-check"  ></i>
                <i *ngIf="interventions2?.pairing.modified === false" class="fa fa-times" ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <div class="card-body p-0">
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
                        *ngIf="!interventions2?.token_economy"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.token_economy"
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
                        *ngIf="interventions2?.generalization"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="interventions2?.generalization"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!interventions2?.generalization"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.generalization"
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
                      <i *ngIf="interventions2?.NCR" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.NCR" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.NCR" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.NCR" class="fa fa-times"></i>
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
                        *ngIf="interventions2?.behavioral_momentum"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="interventions2?.behavioral_momentum"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!interventions2?.behavioral_momentum"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.behavioral_momentum"
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
                      <i *ngIf="interventions2?.DRA" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.DRA" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.DRA" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.DRA" class="fa fa-times"></i>
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
                      <i *ngIf="interventions2?.DRI" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.DRI" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.DRI" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.DRI" class="fa fa-times"></i>
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
                      <i *ngIf="interventions2?.DRO" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.DRO" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.DRO" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.DRO" class="fa fa-times"></i>
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
                      <i *ngIf="interventions2?.DRL" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.DRL" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.DRL" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.DRL" class="fa fa-times"></i>
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
                        *ngIf="interventions2?.response_block"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="interventions2?.response_block"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!interventions2?.response_block"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.response_block"
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
                        *ngIf="interventions2?.errorless_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="interventions2?.errorless_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!interventions2?.errorless_teaching"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.errorless_teaching"
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
                        *ngIf="interventions2?.extinction"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="interventions2?.extinction"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!interventions2?.extinction"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.extinction"
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
                      <i *ngIf="interventions2?.chaining" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.chaining" class="fa fa-check"></i>
                      <i
                        *ngIf="!interventions2?.chaining"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.chaining"
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
                        *ngIf="interventions2?.natural_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="interventions2?.natural_teaching"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!interventions2?.natural_teaching"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.natural_teaching"
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
                        *ngIf="interventions2?.redirection"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="interventions2?.redirection"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!interventions2?.redirection"
                        class="fa fa-times"
                      ></i>
                      <i
                        *ngIf="!interventions2?.redirection"
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
                      <i *ngIf="interventions2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.shaping" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.shaping" class="fa fa-times"></i>
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
                      <i *ngIf="interventions2?.pairing" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.pairing" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.pairing" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.pairing" class="fa fa-times"></i>
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
                      <i *ngIf="interventions2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="interventions2?.shaping" class="fa fa-check"></i>
                      <i *ngIf="!interventions2?.shaping" class="fa fa-times"></i>
                      <i *ngIf="!interventions2?.shaping" class="fa fa-times"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- Interventions -->
  `,
})
export class interventions2ViewComponent {
  @Input() interventions2;

  updateInterventions() {
    const interventions2sObj = this.interventions2
      .filter((interventions2) => interventions2.value)
      .reduce((acc, interventions2) => {
        acc[interventions2.id] = true;
        return acc;
      }, {});
  }
}
