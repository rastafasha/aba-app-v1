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
            <tr *ngFor="let behavior of behaviorList">
              <td>{{ behavior.maladaptive_behavior }}</td>
              <td>
              <div
                class="status-toggle d-flex justify-content-between align-items-center"
              >
                <input
                  type="checkbox"
                  [id]="'check-' + behavior.maladaptive_behavior"
                  class="check"
                  [(ngModel)]="behavior.value"
                  [name]="'check-' + behavior.maladaptive_behavior"
                  (ngModelChange)="updateBehaviors()"
                />
                <label [for]="'check-' + behavior.maladaptive_behavior" class="checktoggle"
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
      .filter((behavior) => behavior.value)
      .reduce((acc, behavior) => {
        acc[behavior.index] = { discused: !!behavior.value };
        return acc;
      }, {}); // Valor inicial para el acumulador
    console.log(result);
    this.behaviorsChange.emit(result);
  }
  
}