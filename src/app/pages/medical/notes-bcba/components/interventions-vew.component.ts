import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Protocol } from 'src/app/core/models/notes.model';

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
                <th>Demonstrated</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let interv of interventions; let i = index">
                <td>{{ interv.name }}</td>
                <td>
                <i  *ngIf="interv.demonstrated === true"><i class="fa fa-check"  ></i></i>
                <i  *ngIf="interv.demonstrated === false"><i class="fa fa-times"  ></i></i>
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
  @Input() interventions: Protocol[];

}
