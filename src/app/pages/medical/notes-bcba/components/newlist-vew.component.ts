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
            <tr *ngFor="let newlist of newlist_added; let i = index">
              <td>{{ newlist.name }}</td>
              <td>
              <i  *ngIf="newlist.value === true"><i class="fa fa-check"  ></i></i>
              <i  *ngIf="newlist.value === false"><i class="fa fa-times"  ></i></i>
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
  
}
