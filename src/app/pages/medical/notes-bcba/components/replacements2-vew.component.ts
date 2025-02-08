import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanProtocol } from 'src/app/core/models/notes.model';

@Component({
  selector: 'app-replacements2-view',
  template: `
    <div class="card-header">
      <h4 class="card-title">Replacements Protocols</h4>
    </div>
    <div class="card-body p-0">
      <app-split-table [data]="obj_inprogress" [headerTemplate]="replacementsHeader" [rowTemplate]="replacementsRow">
        <ng-template #replacementsHeader>
          <thead>
            <tr>
              <th>Name</th>
              <th>Assessed</th>
              <th>Modified</th>
            </tr>
          </thead>
        </ng-template>

        <ng-template #replacementsRow let-replace>
          <td>{{ replace.name }}</td>
          <td>
            <i *ngIf="replace.assessed" class="fa fa-check"></i>
            <i *ngIf="!replace.assessed" class="fa fa-times"></i>
          </td>
          <td>
            <i *ngIf="replace.modified" class="fa fa-check"></i>
            <i *ngIf="!replace.modified" class="fa fa-times"></i>
          </td>
        </ng-template>
      </app-split-table>
    </div>
  `,
})
export class Replacement2ViewComponent {
  @Input() obj_inprogress: PlanProtocol[];
}
