import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-newlist',
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
                <!-- <input class="form-check-input" type="checkbox" id="Assessed" value="Assessed" checked aria-label="..."> -->
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="iteml.id"
                    class="check"
                    [(ngModel)]="iteml.value"
                    [name]="iteml.id"
                  />
                  <!-- (ngModelChange)="updateitemls()" -->
                  <label [for]="iteml.id" class="checktoggle">checkbox</label>
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
  @Input() newList: any[];
  @Output() newListChange = new EventEmitter<any>();

  updatenewLists() {
    const newListsObj = this.newList
      .filter((newList) => newList.value)
      .reduce((acc, newList) => {
        acc[newList.id] = true;
        return acc;
      }, {});
    this.newListChange.emit([newListsObj]);
  }
}
