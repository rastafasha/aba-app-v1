import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Interventions2 } from '../interfaces';

@Component({
  selector: 'app-interventions3',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
  template: `
  <div class="col-12">
      <h5>Intervention protocols</h5>
      <div class="table-responsive content-box">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Assessed</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let intervention of interventionsList2; let i = index">
              <td>{{ intervention.name }}</td>
              <td>
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="intervention.id + '-assessed'"
                    class="check"
                    [(ngModel)]="intervention.value"
                    disabled
                    [name]="intervention.id + '-assessed'"
                    (ngModelChange)="updatedInterventions2()"
                  />
                  <label
                    [for]="intervention.id + '-assessed'"
                    class="checktoggle"
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
                    [id]="intervention.id + '-modified'"
                    class="check"
                    [(ngModel)]="intervention.value2"
                    [name]="intervention.id + '-modified'"
                    (ngModelChange)="updatedInterventions2()"
                  />
                  <label
                    [for]="intervention.id + '-modified'"
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
export class Interventions2Component {
  @Input() interventionsList2: Interventions2[];
  @Output() update = new EventEmitter<object>();

  updatedInterventions2() {
    const result = this.interventionsList2
      .filter((intervention) => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = { assessed:!!intervention.value, modified:!!intervention.value2,};
        return acc;
      }, {});
      console.log(result);
    this.update.emit(result);
  }
}
