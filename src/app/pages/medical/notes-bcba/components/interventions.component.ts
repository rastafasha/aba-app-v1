import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Intervention } from '../interfaces';

@Component({
  selector: 'app-interventions2',
  styleUrls: ['../note-bcba/note-bcba.component.scss'],
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
                (ngModelChange)="updatedInterventions()"
              />
              <label [for]="intervention.id" class="checktoggle"
              
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
  @Input() interventionsList: Intervention[];
  @Output() interventionsChange = new EventEmitter<object>();

  updatedInterventions() {
    const interventionsObj = this.interventionsList
      .filter((intervention) => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = {demostrated:!!intervention.value};
        return acc;
      }, {});
      console.log(interventionsObj);
    this.interventionsChange.emit([interventionsObj]);
  }
}
