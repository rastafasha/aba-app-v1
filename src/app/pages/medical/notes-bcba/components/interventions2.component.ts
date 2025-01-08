import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-interventions3',
  template: `
    <div class="col-12">
      <h5>Intervention protocols</h5>
      <div class="table-responsive content-box">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Demostrated</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let intervention of interventionsList; let i = index">
              <td>{{ intervention.name }}</td>
              <td>
               
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="intervention.id"
                    class="check"
                    [(ngModel)]="intervention.value"
                    [name]="intervention.id"
                  />
                  <label [for]="intervention.id" class="checktoggle"
                  (ngModelChange)="updatedInterventions2()"
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
  @Input() interventionsList: any[];
  @Output() interventionsChange = new EventEmitter<any>();

  updatedInterventions2() {
    const interventionsObj = this.interventionsList
      .filter((intervention) => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = true;
        return acc;
      }, {});
    this.interventionsChange.emit([interventionsObj]);
  }
}
