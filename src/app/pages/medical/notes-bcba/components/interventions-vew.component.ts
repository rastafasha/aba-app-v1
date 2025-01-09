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
        <div class="table-responsive content-box">
          <table class="table mb-0 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Demostrated</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>Token Economy</td>
                <td>
                <i *ngIf="interventions[0]?.token_economy.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.token_economy.demostrated === false "  class="fa fa-times" ></i>
                </td>
                
              </tr>
              <tr >
                <td>Generalization</td>
                <td>
                <i *ngIf="interventions[0]?.generalization.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.generalization.demostrated === false "  class="fa fa-times" ></i>
                </td>
                
              </tr>
              <tr >
                <td>NCR</td>
                <td>
                <i *ngIf="interventions[0]?.NCR.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.NCR.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Behavioral Momentum</td>
                <td>
                <i *ngIf="interventions[0]?.behavioral_momentum.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.behavioral_momentum.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRA</td>
                <td>
                <i *ngIf="interventions[0]?.DRA.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.DRA.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRI</td>
                <td>
                <i *ngIf="interventions[0]?.DRI.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.DRI.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRO</td>
                <td>
                <i *ngIf="interventions[0]?.DRO.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.DRO.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>DRL</td>
                <td>
                <i *ngIf="interventions[0]?.DRL.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.DRL.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Response Block</td>
                <td>
                <i *ngIf="interventions[0]?.response_block.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.response_block.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Errorless Teaching</td>
                <td>
                <i *ngIf="interventions[0]?.errorless_teaching.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.errorless_teaching.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Extinction</td>
                <td>
                <i *ngIf="interventions[0]?.extinction.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.extinction.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Chaining</td>
                <td>
                <i *ngIf="interventions[0]?.chaining.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.chaining.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Natural Teaching</td>
                <td>
                <i *ngIf="interventions[0]?.natural_teaching.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.natural_teaching.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Redirection</td>
                <td>
                <i *ngIf="interventions[0]?.redirection.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.redirection.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Shaping</td>
                <td>
                <i *ngIf="interventions[0]?.shaping.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.shaping.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Pairing</td>
                <td>
                <i *ngIf="interventions[0]?.pairing.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="interventions[0]?.pairing.demostrated === false "  class="fa fa-times" ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- interventions -->
  `,
})
export class InterventionViewComponent {
  @Input() interventions;

  updateInterventions() {
    const interventionsObj = this.interventions
      .filter((interventions) => interventions.value)
      .reduce((acc, interventions) => {
        acc[interventions.id] = true;
        return acc;
      }, {});
  }
}
