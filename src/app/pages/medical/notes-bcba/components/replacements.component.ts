import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  ReplacementL } from '../interfaces';

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
              <th>Demostrated</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let replac of replacementList; let i = index">
              <td>{{ replac.name }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="replac.id + '-demostrated'"
                    class="check"
                    [(ngModel)]="replac.value"
                    [name]="replac.name + '-demostrated'"
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
  @Input() replacementList: ReplacementL[];
  @Output() replacementChange = new EventEmitter<object>();

  updateReplacements() {
    const replacementsObj = this.replacementList
      .filter((replac) => replac.value)
      .reduce((acc, replac) => {
        acc[replac.id] = {
          id: replac.id, 
          demostrated: !!replac.value, 
          name: replac.name };
        return acc;
      }, {});

      console.log(replacementsObj);
    this.replacementChange.emit([replacementsObj]);
  }
}
