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
            <tr *ngFor="let behav of behaviors; let i = index">
              <td>{{ behav.name }}</td>
              <td>
              <i *ngIf="behav.discused === true"   class="fa fa-check"  ></i>
                <i *ngIf="behav.discused === false "  class="fa fa-times" ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class BehaviorViewComponent {
  @Input() behaviors;

  updateBehaviors() {
    const result = this.behaviors
      .filter((behaviors) => behaviors.value)
      .reduce((acc, behaviors) => {
        acc[behaviors.id] = true;
        return acc;
      }, {});
      console.log(result);
      console.log(this.behaviors);
  }

  
}
