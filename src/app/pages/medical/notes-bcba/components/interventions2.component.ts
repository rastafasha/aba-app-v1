import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InterventionsDoble } from '../interfaces';

@Component({
  selector: 'app-interventions3',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
  template: `
    <div class="col-12">
      <h5>Intervention protocols</h5>
      <app-split-table
        [data]="interventionsListDoble"
        [headerTemplate]="headerTemplate"
        [rowTemplate]="rowTemplate">
        <ng-template #headerTemplate>
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Assessed</th>
              <th>Modified</th>
            </tr>
          </thead>
        </ng-template>

        <ng-template #rowTemplate let-intervent>
          <td>{{ intervent.name }}</td>
          <td>
            <div class="status-toggle d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                [id]="intervent.id + '-assessed'"
                class="check"
                [(ngModel)]="intervent.value"
                disabled
                [name]="intervent.id + '-assessed'"
                (ngModelChange)="updatedInterventions2()"
              />
              <label [for]="intervent.id + '-assessed'" class="checktoggle">checkbox</label>
            </div>
          </td>
          <td>
            <div class="status-toggle d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                [id]="intervent.id + '-modified'"
                class="check"
                [(ngModel)]="intervent.value2"
                [name]="intervent.id + '-modified'"
                (ngModelChange)="updatedInterventions2()"
              />
              <label [for]="intervent.id + '-modified'" class="checktoggle">checkbox</label>
            </div>
          </td>
        </ng-template>
      </app-split-table>
    </div>
  `,
})
export class Interventions2Component {
  @Input() interventionsListDoble: InterventionsDoble[];
  @Output() update = new EventEmitter<object>();

  updatedInterventions2() {
    const result = this.interventionsListDoble
      .filter((intervent) => intervent.value || intervent.value2)
      .reduce((acc, intervent) => {
        acc[intervent.id] = {
          id: intervent.id,
          name: intervent.name,
          assessed: !!intervent.value,
          modified: !!intervent.value2,
        };
        return acc;
      }, {});
    console.log(result);
    this.update.emit(result);
  }
}
