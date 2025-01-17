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
      
    </div>
    <!-- Interventions -->
  `,
})
export class interventions2ViewComponent {
  @Input() interventions2;

  ngOnInit(): void {
    console.log('interventions2', this.interventions2); // Verifica que la data esté siendo recibida
  }

  updateInterventions() {
    const interventions2sObj = this.interventions2
    .filter((interventions2) => interventions2.value || interventions2.value2)
    .reduce((acc, interventions2) => {
      acc = {
        assessed: interventions2.value === true ? true : false,
        modified: interventions2.value2 === true ? true : false,
      };
      return acc;
    }, {});
  }
}
