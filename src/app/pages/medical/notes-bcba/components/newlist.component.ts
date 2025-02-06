import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewList } from '../interfaces';

@Component({
  selector: 'app-newlist',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
  template: `
    <div class="col-12">
      <!-- <h5>Intervention protocols</h5> -->
      <app-split-table
        [data]="newList"
        [headerTemplate]="headerTemplate"
        [rowTemplate]="rowTemplate">
        <ng-template #headerTemplate>
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Select</th>
            </tr>
          </thead>
        </ng-template>

        <ng-template #rowTemplate let-iteml>
          <td>{{ iteml.name }}</td>
          <td>
            <div class="status-toggle d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                [id]="iteml.id"
                class="check"
                [(ngModel)]="iteml.value"
                [name]="iteml.id"
                (ngModelChange)="updatenewLists()"
              />
              <label [for]="iteml.id" class="checktoggle">checkbox</label>
            </div>
          </td>
        </ng-template>
      </app-split-table>
    </div>
  `,
})
export class NewListComponent {
  @Input() newList: NewList[];
  @Output() newListChange = new EventEmitter<object>();

  updatenewLists() {
    const newListsObj = this.newList
      .filter((iteml) => iteml.value)
      .reduce((acc, iteml) => {
        acc[iteml.id] = {
          id: iteml.id,
          option:!!iteml.value
        }
        return acc;
      }, {});
      console.log(newListsObj);
    this.newListChange.emit([newListsObj]);
  }
}
