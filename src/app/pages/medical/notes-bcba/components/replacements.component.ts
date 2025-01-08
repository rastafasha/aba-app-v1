import { Component, EventEmitter, Input, Output } from '@angular/core';

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
                            <th>Assessed</th>
                            <th>Modified</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr *ngFor="let replac of rbt_training_goals; let i = index">
                            <td>{{ replac.lto }}</td>
                            <td>
                              <!-- <input class="form-check-input" type="checkbox" id="Assessed" value="Assessed" checked aria-label="..."> -->
                              <div class="status-toggle d-flex justify-content-between align-items-center">
                                <input type="checkbox" [id]="replac.id + '-assessed'" class="check"
                                       [(ngModel)]="replac.value"
                                       [name]="replac.id + '-assessed'"
                                       >
                                       <!-- (ngModelChange)="updatereplacs()" -->
                                <label [for]="replac.id + '-assessed'" class="checktoggle">checkbox</label>
    
                              </div>
                            </td>
                            <td>
                              <!-- <input class="form-check-input" type="checkbox" id="Modified" value="Modified" aria-label="..."> -->
                              <div class="status-toggle d-flex justify-content-between align-items-center">
                                <input type="checkbox" [id]="replac.id + '-modified'" class="check"
                                       [(ngModel)]="replac.value2"
                                       [name]="replac.id + '-modified'"
                                       >
                                <label [for]="replac.id + '-modified'" class="checktoggle"
                                (ngModelChange)="updateReplacements()">checkbox</label>
    
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
