import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaladaptiveProtocol } from '../interfaces';

@Component({
  selector: 'app-behaviors',
  template: `
    <div class="col-12">
      <h5>Behaviors</h5>
      <app-split-table
        [data]="behaviorList"
        [headerTemplate]="headerTemplate"
        [rowTemplate]="rowTemplate">
        <ng-template #headerTemplate>
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Discused</th>
            </tr>
          </thead>
        </ng-template>

        <ng-template #rowTemplate let-behav>
          <td>{{ behav.name }}</td>
          <td>
            <div class="status-toggle d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                [id]="behav.id + '-discussed'"
                class="check"
                [(ngModel)]="behav.value"
                [name]="behav.name + '-discussed'"
                (ngModelChange)="updateBehaviors()"
              />
              <label [for]="behav.id + '-discussed'" class="checktoggle">checkbox</label>
            </div>
          </td>
        </ng-template>
      </app-split-table>
    </div>
  `,
})
export class BehaviorsComponent {
  @Input() behaviorList: MaladaptiveProtocol[];
  @Output() behaviorsChange = new EventEmitter<object>();

  updateBehaviors() {
    const result = this.behaviorList
      .filter((behav) => behav.value)
      .reduce((acc, behav) => {
        acc[behav.id] = {
          id: behav.id,
          discused: !!behav.value,
          name: behav.name
        };
        return acc;
      }, {});
    console.log(result);
    this.behaviorsChange.emit(result);
  }
}
