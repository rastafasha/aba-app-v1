import { Component, EventEmitter, Input, Output } from '@angular/core';

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
                      <tr *ngFor="let replac of rbt_training_goals; let i = index">
                        <td>{{ replac.lto }}</td>
                        <td>
                         <div class="status-toggle d-flex justify-content-between align-items-center">
                            <input type="checkbox" [id]="replac.id" class="check"
                                   [(ngModel)]="replac.value"
                                   [name]="replac.id"
                                   >
                                   <!-- (ngModelChange)="updateInterventions()" -->
                            <label [for]="replac.id" class="checktoggle">checkbox</label>

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
  @Input() rbt_training_goals: any[];
  @Output() replacementsChange = new EventEmitter<any>();

  updateReplacements() {
    const replacementsObj = this.rbt_training_goals
      .filter((replacement) => replacement.value)
      .reduce((acc, replacement) => {
        acc[replacement.id] = true;
        return acc;
      }, {});
    this.replacementsChange.emit([replacementsObj]);
  }
}
