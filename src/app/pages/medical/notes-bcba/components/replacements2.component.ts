import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplacementL } from '../interfaces';

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
              <th>Demostrated</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let replacement of replacementList; let i = index">
              <td>{{ replacement.goal }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="replacement.id"
                    class="check"
                    [(ngModel)]="replacement.value"
                    [name]="replacement.goal"
                    (ngModelChange)="updateReplacements()"
                  />
                  <label
                    [for]="replacement.id"
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
  @Input() replacementList: ReplacementL[];
  @Output() replacementsChange = new EventEmitter<object>();

  updateReplacements() {
    const replacementsObj = this.replacementList
      .filter((replacement) => replacement.value)
      .reduce((acc, replacement) => {
        acc[replacement.goal] = { demostrated: !!replacement.value, name: replacement.goal };
        return acc;
      }, {});

      console.log(replacementsObj);
    this.replacementsChange.emit([replacementsObj]);
  }
}
