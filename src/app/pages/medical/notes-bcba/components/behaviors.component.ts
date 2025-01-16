import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Maladaptives } from '../interfaces';

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
            <tr *ngFor="let behav of behaviorList; let i = index">
              <td>{{ behav.name }}</td>
              <td>
              <div
                class="status-toggle d-flex justify-content-between align-items-center"
              >
                <input
                  type="checkbox"
                  [id]=" behav.id + '-discussed'"
                  class="check"
                  [(ngModel)]="behav.value"
                  [name]="behav.name + '-discussed'"
                  (ngModelChange)="updateBehaviors()"
                />
                <label [for]="behav.id +'-discussed'"
                 class="checktoggle"
                  >checkbox</label>
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
  @Input() behaviorList: Maladaptives[];
  @Output() behaviorsChange = new EventEmitter<object>();

  updateBehaviors() {
    const result = this.behaviorList
      .filter((behav) => behav.value)
      .reduce((acc, behav) => {
        acc = {
          id:behav.id, 
          discused: !!behav.value, 
          name: behav.name 
        };
        return acc;
      }, {}); 
    console.log(result);
    this.behaviorsChange.emit(result);
  }
  
}