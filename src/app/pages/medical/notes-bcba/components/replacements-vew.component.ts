import { Component, EventEmitter, Input, Output } from '@angular/core';

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
            <tr *ngFor="let replaceme of obj_inprogress; let i = index">
              <td>{{ replaceme.description }}</td>
              <td>
              <i *ngIf="replaceme.description?.demostrated === true"   class="fa fa-check"  ></i>
                <i *ngIf="replaceme.description?.demostrated === false "  class="fa fa-times" ></i>
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
  @Input() obj_inprogress;
  

  updatereplacements() {
    const replacementsObj = this.obj_inprogress
      .filter((replacements) => replacements.value)
      .reduce((acc, replacements) => {
        acc[replacements.id] = true;
        return acc;
      }, {});

      
  }
}
