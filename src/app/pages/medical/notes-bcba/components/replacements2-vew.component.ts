import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-replacements2-view',
  template: `
    <!-- Interventions -->
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Replacements Protocols</h4>
      </div>
      <!-- body card -->
      <div class="card-body p-0">
      <div class="table-responsive content-box">
          <table class="table mb-0 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Assessed</th>
                <th>Modified</th>
              </tr>
            </thead>
            <tbody>
            <tr *ngFor="let replace of obj_inprogress; let i = index">
              <td>{{ replace.description }}</td>
              <td>
              <i  *ngIf="replace.value === true"><i class="fa fa-check"  ></i></i>
              <i  *ngIf="replace.value === false"><i class="fa fa-times"  ></i></i>
              </td>
              <td>
              <i  *ngIf="replace.value2 === true"><i class="fa fa-check"  ></i></i>
              <i  *ngIf="replace.value2 === false"><i class="fa fa-times"  ></i></i>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
    </div>
    </div>
    <!-- interventions -->
  `,
})
export class Replacement2ViewComponent {
  @Input() obj_inprogress;

  

}
