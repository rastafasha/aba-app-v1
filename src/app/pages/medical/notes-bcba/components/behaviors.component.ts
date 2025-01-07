import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-behaviors',
  template: `
    <div class="col-12">
      <h5>Behaviors</h5>
      <div class="table-responsive ">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Discused</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let behav of behaviorsList; let i = index">
              <td>{{ behav.name }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="behav.id"
                    class="check"
                    [(ngModel)]="behav.value"
                    [name]="behav.id"
                  />
                  <!-- (ngModelChange)="updateInterventions()" -->
                  <label [for]="behav.id" class="checktoggle">checkbox</label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class BehaviorsComponent {
  @Input() behaviorsList: any[];
  @Output() behaviorsChange = new EventEmitter<any>();

  updateBehaviors() {
    const behaviorsObj = this.behaviorsList
      .filter((behavior) => behavior.value)
      .reduce((acc, behavior) => {
        acc[behavior.id] = true;
        return acc;
      }, {});
    this.behaviorsChange.emit([behaviorsObj]);
  }
}
