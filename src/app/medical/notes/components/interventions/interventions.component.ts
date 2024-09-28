import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-interventions',
  template: `
    <div class="col-12">
      <h4>Interventions</h4>
    </div>
    <div class="container">
      <form autocomplete="false">
        <div class="col-xs-12">
          <div class="row">
            <div class="col-xs-12 col-sm-3" *ngFor="let intervention of interventionsList">
              <div class="form-group">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="card-title">{{intervention.name}}</h5>
                  <div class="status-toggle d-flex justify-content-between align-items-center">
                    <input type="checkbox" [id]="intervention.id" class="check"
                           [(ngModel)]="intervention.value"
                           [name]="intervention.id"
                           (ngModelChange)="updateInterventions()">
                    <label [for]="intervention.id" class="checktoggle">checkbox</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `
})
export class InterventionsComponent {
  @Input() interventionsList: any[];
  @Output() interventionsChange = new EventEmitter<any>();

  updateInterventions() {
    const interventionsObj = this.interventionsList
      .filter(intervention => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = true;
        return acc;
      }, {});
    this.interventionsChange.emit([interventionsObj]);
  }
}
