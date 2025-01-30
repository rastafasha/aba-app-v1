import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DiscussedPlanProtocol } from 'src/app/core/models/notes.model';

@Component({
  selector: 'app-replacements-view',
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
              <td>{{ replaceme.name }}</td>
              <td>
              <i  *ngIf="replaceme.discussed"><i class="fa fa-check"  ></i></i>
              <i  *ngIf="!replaceme.discussed"><i class="fa fa-times"  ></i></i>
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
  @Input() replacements: DiscussedPlanProtocol[];


  updatereplacements() {
    const replacementsObj = this.replacements
      .filter((replacements) => replacements.discussed)
      .reduce((acc, replacements) => {
        // acc[replacements.id] = true;
        acc[replacements.plan_id] = {
          plan_id: replacements.plan_id,
          name: replacements.name,
          discussed: !!replacements.discussed,
        };
        return acc;
      }, {});


  }
}
