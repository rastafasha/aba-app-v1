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
              <tr *ngFor="let interv of interventions2; let i = index">
                <td>{{ interv.name }}</td>
                <td>
                <i  *ngIf="interv.value === true"><i class="fa fa-check"  ></i></i>
                <i  *ngIf="interv.value === false"><i class="fa fa-times"  ></i></i>
                </td>
                <td>
                <i  *ngIf="interv.value2 === true"><i class="fa fa-check"  ></i></i>
                <i  *ngIf="interv.value2 === false"><i class="fa fa-times"  ></i></i>
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

  
 
}
