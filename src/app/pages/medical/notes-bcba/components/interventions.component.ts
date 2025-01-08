import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-interventions2',
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
                <!-- <input class="form-check-input" type="checkbox" id="Assessed" value="Assessed" checked aria-label="..."> -->
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="intervention.id + '-assessed'"
                    class="check"
                    [(ngModel)]="intervention.value"
                    [name]="intervention.id + '-assessed'"
                  />
                  <!-- (ngModelChange)="updateInterventions()" -->
                  <label
                    [for]="intervention.id + '-assessed'"
                    class="checktoggle"
                    >checkbox</label
                  >
                </div>
              </td>
              <td>
                <!-- <input class="form-check-input" type="checkbox" id="Modified" value="Modified" aria-label="..."> -->
                <div
                  class="status-toggle d-flex justify-content-between align-items-center"
                >
                  <input
                    type="checkbox"
                    [id]="intervention.id + '-modified'"
                    class="check"
                    [(ngModel)]="intervention.value2"
                    [name]="intervention.id + '-modified'"
                  />
                  <label
                    [for]="intervention.id + '-modified'"
                    class="checktoggle"
                    (ngModelChange)="updateInterventions()"
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
export class InterventionsComponent {
  @Input() interventionsList2: any[];
  @Output() interventionsChange = new EventEmitter<any>();

  updateInterventions() {
    const interventionsObj = this.interventionsList2
      .filter((intervention) => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = true;
        return acc;
      }, {});
    this.interventionsChange.emit([interventionsObj]);
  }
}
