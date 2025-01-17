import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  Objetives, ReplacementL2 } from '../interfaces';

@Component({
  selector: 'app-replacements2',
  template: `
    <div class="col-12">
      <h5>replacements protocols</h5>
      <div class="table-responsive ">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Assessed</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let replac of obj_inprogress1; let i = index">
              <td>{{ replac.description }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="replac.id + '-assessed'"
                    class="check"
                    [(ngModel)]="replac.value"
                    [name]="replac.id + '-assessed'"
                    (ngModelChange)="updateReplacements()"
                  />
                  <label [for]="replac.id + '-assessed'" class="checktoggle"
                  
                    >checkbox</label
                  >
                </div>
              </td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="replac.id + '-modified'"
                    class="check"
                    [(ngModel)]="replac.value2"
                    [name]="replac.description + '-modified'"
                    (ngModelChange)="updateReplacements()"
                  />
                  <label
                    [for]="replac.id + '-modified'"
                    class="checktoggle"
                    >checkbox</label
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class Replacements2Component {
  @Input() obj_inprogress1: Objetives[];
  @Output() replacementsChange2 = new EventEmitter<object>();

  

  updateReplacements() {
    const replacementsObj = this.obj_inprogress1
      .filter((replac) => replac.value || replac.value2)
      .reduce((acc, replac) => {
        acc[replac.id] = {
          id: replac.id, 
          modified:!!replac.value2, 
          assessed:!!replac.value, 
          description:replac.description};
        return acc;
      }, {});
      console.log(replacementsObj);
    this.replacementsChange2.emit(replacementsObj);
  }
}
