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
  @Input() obj_inprogress;

  ngOnInit(): void {
    console.log('obj_inprogress', this.obj_inprogress); // Verifica que la data esté siendo recibida
  }

  updatereplacements() {
    const replacementsObj = this.obj_inprogress
      .filter((replace) => replace.value || replace.value2)
      .reduce((acc, replace) => {
        acc[replace.id] = true;
        return acc;
      }, {});
  }
}
