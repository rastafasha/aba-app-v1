import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-behaviorslist-view',
  template: `
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Behaviors</h4>
      </div>
      <!-- body card -->
      <div class="table-responsive ">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Discused</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let behav of maladaptives; let i = index">
              <td>{{ behav.maladaptive_behavior }}</td>
              <td>
              <i *ngIf="behav?.maladaptive_behavior" class="fa fa-check"></i>
              <i *ngIf="!behav?.maladaptive_behavior" class="fa fa-times"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class BehaviorViewComponent {
  @Input() maladaptives;

  updateInterventions() {
    const behaviorsListsObj = this.maladaptives
      .filter((behaviorsList) => behaviorsList.value)
      .reduce((acc, behaviorsList) => {
        acc[behaviorsList.id] = true;
        return acc;
      }, {});
  }
}
