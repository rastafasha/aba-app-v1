import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Protocol } from 'src/app/core/models/notes.model';

@Component({
  selector: 'app-intervention2-view',
  template: `
    <div class="card-header">
      <h4 class="card-title">Interventions Protocols</h4>
    </div>
    <div class="card-body p-0">
      <app-split-table [data]="interventions2" [headerTemplate]="interventionsHeader" [rowTemplate]="interventionsRow">
        <ng-template #interventionsHeader>
          <thead>
            <tr>
              <th>Name</th>
              <th>Assessed</th>
              <th>Modified</th>
            </tr>
          </thead>
        </ng-template>

        <ng-template #interventionsRow let-interv>
          <td>{{ interv.name }}</td>
          <td>
            <i *ngIf="interv.assessed" class="fa fa-check"></i>
            <i *ngIf="!interv.assessed" class="fa fa-times"></i>
          </td>
          <td>
            <i *ngIf="interv.modified" class="fa fa-check"></i>
            <i *ngIf="!interv.modified" class="fa fa-times"></i>
          </td>
        </ng-template>
      </app-split-table>
    </div>
  `,
})
export class interventions2ViewComponent {
  @Input() interventions2: Protocol[];
}
