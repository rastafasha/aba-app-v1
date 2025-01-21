import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Intervention } from '../../interfaces';

@Component({
  selector: 'app-interventions',
  template: `
    <div class="col-12">
      <h4>Interventions</h4>
    </div>
    <div class="container">
      <form autocomplete="off">
        <div class="col-xs-12">
          <div class="row">
            <div
              class="col-xs-12 col-sm-3"
              *ngFor="let interv of interventionsList; let i = index"
            >
              <div class="form-group">
                <div
                  class="card-header d-flex justify-content-between align-items-center"
                >
                  <h5 class="card-title">{{ interv?.name }}</h5>
                  <div
                    class="status-toggle d-flex justify-content-between align-items-center"
                  >
                    <input
                      type="checkbox"
                      [id]="interv.id"
                      class="check"
                      [(ngModel)]="interv.value"
                      [name]="interv.id"
                      [ngModelOptions]="{standalone: true}"
                      (ngModelChange)="updateInterventions()"
                    />
                    <label [for]="interv.id" class="checktoggle"
                      >checkbox</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class InterventionsComponent {
  @Input() interventionsList: Intervention[];
  @Output() interventionsChange = new EventEmitter<any>();
  
  

  updateInterventions() {
    const interventionsObj = this.interventionsList
      .filter((interv) => interv.value)
      .reduce((acc, interv) => {
        // acc[interv.id] = interv.value;
        acc[interv.id] = {
          id: interv.id,
          name: interv.name,
          value: !!interv.value,
        };
        // acc[interv.id] = true;
        return acc;
      }, {});
    console.log(interventionsObj);
    this.interventionsChange.emit([interventionsObj]);
  }
}
