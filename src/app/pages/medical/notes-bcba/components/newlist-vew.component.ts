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
                <td>FAST</td>
                <td>
                <i *ngIf="newlist_added?.FAST?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="!newlist_added?.FAST?.option === false "  class="fa fa-times" ></i>
                </td>
                
              </tr>
              <tr >
                <td>MAST</td>
                <td>
                <i *ngIf="newlist_added?.MAST?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.MAST?.option === false "  class="fa fa-times" ></i>
                </td>
                
              </tr>
              <tr >
                <td>QABF</td>
                <td>
                <i *ngIf="newlist_added?.QABF?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.QABF?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>ABC Data Collection</td>
                <td>
                <i *ngIf="newlist_added?.ABC_data_collection?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.ABC_data_collection?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>VBmapp</td>
                <td>
                <i *ngIf="newlist_added?.VBmapp?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.VBmapp?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Ablls</td>
                <td>
                <i *ngIf="newlist_added?.Ablls?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.Ablls?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>EFL</td>
                <td>
                <i *ngIf="newlist_added?.EFL?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.EFL?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Peak</td>
                <td>
                <i *ngIf="newlist_added?.peak?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.peak?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Parent Interview</td>
                <td>
                <i *ngIf="newlist_added?.parent_interview?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.parent_interview?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Reinforcement Questionnaire</td>
                <td>
                <i *ngIf="newlist_added?.reinforcement_questionnaire?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.reinforcement_questionnaire?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Preference assessment</td>
                <td>
                <i *ngIf="newlist_added?.preference_assessment?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.preference_assessment?.option === false "  class="fa fa-times" ></i>
                </td>
              </tr>
              <tr >
                <td>Other</td>
                <td>
                <i *ngIf="newlist_added?.other?.option === true"   class="fa fa-check"  ></i>
                <i *ngIf="newlist_added?.other?.option === false "  class="fa fa-times" ></i>
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
export class NewlistViewComponent {
  @Input() newlist_added;
  
  updateInterventions() {
    const newlistsObj = this.newlist_added
      .filter((newlist_added) => newlist_added.value)
      .reduce((acc, newlist_added) => {
        acc[newlist_added.id] = true;
        return acc;
      }, {});
  }
}
