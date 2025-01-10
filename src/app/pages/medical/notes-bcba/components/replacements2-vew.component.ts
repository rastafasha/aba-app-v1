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
            <tr *ngFor="let replaceme of replacements2; let i = index">
              <td>{{ replaceme.goal }}</td>
              <td>
              <i *ngIf="replaceme?.goal.assessed === true"   class="fa fa-check"  ></i>
                <i *ngIf="replaceme?.goal.assessed === false "  class="fa fa-times" ></i>
              </td>
              <td>
              <i *ngIf="replaceme?.goal.modified === true"   class="fa fa-check"  ></i>
                <i *ngIf="replaceme?.goal.modified === false "  class="fa fa-times" ></i>
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
  @Input() replacements2;

  updatereplacements() {
    const replacementsObj = this.replacements2
      .filter((replacements2) => replacements2.value)
      .reduce((acc, replacements2) => {
        acc[replacements2.id] = true;
        return acc;
      }, {});
  }
}
