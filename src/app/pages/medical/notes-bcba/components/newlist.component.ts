import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewList } from '../interfaces';

@Component({
  selector: 'app-newlist',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
  template: `
    <div class="col-12">
      <!-- <h5>Intervention protocols</h5> -->
      <div class="table-responsive content-box">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let iteml of newList; let i = index">
              <td>{{ iteml.name }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="iteml.id"
                    class="check"
                    [(ngModel)]="iteml.value"
                    [name]="iteml.id"
                    (ngModelChange)="updatenewLists()"
                  />
                  <label [for]="iteml.id" class="checktoggle"
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
export class NewListComponent {
  @Input() newList: NewList[];
  @Output() newListChange = new EventEmitter<object>();

  updatenewLists() {
    const newListsObj = this.newList
      .filter((iteml) => iteml.value)
      .reduce((acc, iteml) => {
        acc[iteml.id] = {id: iteml.id, option:!!iteml.value}
        return acc;
      }, {});
      console.log(newListsObj);
    this.newListChange.emit([newListsObj]);
  }
}
