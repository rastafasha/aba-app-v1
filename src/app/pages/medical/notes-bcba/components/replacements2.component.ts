import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  ReplacementL2 } from '../interfaces';

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
            <tr *ngFor="let replacement of replacementList; let i = index">
              <td>{{ replacement.name }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="replacement.id + '-assessed'"
                    class="check"
                    [(ngModel)]="replacement.value"
                    [name]="replacement.id + '-assessed'"
                    (ngModelChange)="updateReplacements()"
                  />
                  <label [for]="replacement.id + '-assessed'" class="checktoggle"
                  
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
                    [id]="replacement.id + '-modified'"
                    class="check"
                    [(ngModel)]="replacement.value2"
                    [name]="replacement.name + '-modified'"
                    (ngModelChange)="updateReplacements()"
                  />
                  <label
                    [for]="replacement.id + '-modified'"
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
  @Input() replacementList: ReplacementL2[];
  @Output() replacementsChange2 = new EventEmitter<object>();

  

  updateReplacements() {
    const replacementsObj = this.replacementList
      .filter((replacement) => replacement.value || replacement.value2)
      .reduce((acc, replacement) => {
        acc[replacement.id] = {modified:!!replacement.value2, assessed:!!replacement.value, goal:replacement.name};
        return acc;
      }, {});
      console.log(replacementsObj);
    this.replacementsChange2.emit(replacementsObj);
  }
}
