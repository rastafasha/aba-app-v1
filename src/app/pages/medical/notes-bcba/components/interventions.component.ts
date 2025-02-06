import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Intervention } from '../interfaces';

@Component({
  selector: 'app-interventions2',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
  template: `
    <div class="col-12">
      <h5>Intervention protocols</h5>
      <app-split-table
        [data]="interventionsList"
        [headerTemplate]="headerTemplate"
        [rowTemplate]="rowTemplate">
        <ng-template #headerTemplate>
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Demonstrated</th>
            </tr>
          </thead>
        </ng-template>

        <ng-template #rowTemplate let-interv>
          <td>{{ interv.name }}</td>
          <td>
            <div class="status-toggle d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                [id]="interv.id"
                class="check"
                [(ngModel)]="interv.value"
                [name]="interv.id"
                (ngModelChange)="updatedInterventions()"
              />
              <label [for]="interv.id" class="checktoggle">checkbox</label>
            </div>
          </td>
        </ng-template>
      </app-split-table>
    </div>
  `,
})
export class InterventionsComponent {
  @Input() interventionsList: Intervention[];
  @Output() interventionsChange = new EventEmitter<object>();

  updatedInterventions() {
    const interventionsObj = this.interventionsList
      .filter((interv) => interv.value)
      .reduce((acc, interv) => {
        acc[interv.id] = {
          id: interv.id,
          name: interv.name,
          demonstrated: !!interv.value,
        };
        return acc;
      }, {});
    console.log(interventionsObj);
    this.interventionsChange.emit([interventionsObj]);
  }
}
