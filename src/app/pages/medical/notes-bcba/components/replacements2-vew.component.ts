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
            <tr *ngFor="let replace of replacementsview; let i = index">
              <td>{{ replace.goal }}</td>
              <td>
              <i *ngIf="replace.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="replace.assessed === false "  class="fa fa-times" ></i>
              </td>
              <td>
              <i *ngIf="replace.modified === true"   class="fa fa-check"  ></i>
                <i *ngIf="replace.modified === false "  class="fa fa-times" ></i>
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
  @Input() replacementsview;

  updatereplacements() {
    const replacementsObj = this.replacementsview
      .filter((replacements2) => replacements2.value)
      .reduce((acc, replacements2) => {
        acc[replacements2.id] = true;
        return acc;
      }, {});
  }
}
