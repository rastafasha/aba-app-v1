import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  Objetives1, ReplacementL } from '../interfaces';

@Component({
  selector: 'app-replacements',
  template: `
<div class="col-12">
      <h5>replacements protocols</h5>
      <div class="table-responsive ">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Demonstrated</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let replac of obj_inprogress; let i = index">
              <td>{{ replac.description }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="replac.id + '-demostrated'"
                    class="check"
                    [(ngModel)]="replac.value"
                    [name]="replac.description + '-demostrated'"
                    (ngModelChange)="updateReplacements()"
                  />
                  <label
                    [for]="replac.id + '-demostrated'"
                    class="checktoggle"
                    >checkbox</label >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>



  `,
})
export class ReplacementsComponent {
  @Input() obj_inprogress: Objetives1[];
  @Output() replacementChange = new EventEmitter<object>();

  updateReplacements() {
    const replacementsObj = this.obj_inprogress
      .filter((replac) => replac.value)
      .reduce((acc, replac) => {
        acc[replac.id] = true;
        // acc[replac.id] = {
        //   id: replac.id,
        //   demonstrated: !!replac.value,
        //   name: replac.description };
        return acc;
      }, {});

      console.log(replacementsObj);
    this.replacementChange.emit([replacementsObj]);
  }
}
