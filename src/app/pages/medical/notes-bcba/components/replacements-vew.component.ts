import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-replacement-view',
  template: `
    <!-- Interventions -->
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Replacements Protocols</h4>
      </div>
      <!-- body card -->
      <div class="card-body p-0">
      <div class="table-responsive ">
        <table class="table mb-0 ">
          <thead>
            <tr>
              <th>please check as needed</th>
              <th>Demostrated</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let replaceme of replacements; let i = index">
              <td>{{ replaceme.goal }}</td>
              <td>
              <i *ngIf="replaceme?.goal.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="replaceme?.goal.demostrated === false "  class="fa fa-times" ></i>
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
export class ReplacementViewComponent {
  @Input() replacements;

  updatereplacements() {
    const replacementsObj = this.replacements
      .filter((replacements) => replacements.value)
      .reduce((acc, replacements) => {
        acc[replacements.id] = true;
        return acc;
      }, {});
  }
}
