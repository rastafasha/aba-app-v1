import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-invoices-settings',
  templateUrl: './invoices-settings.component.html',
  styleUrls: ['./invoices-settings.component.scss'],
})
export class InvoicesSettingsComponent {
  public routes = AppRoutes;
  public checkboxes: string[] = [];

  public openCheckBoxes(val: string) {
    if (this.checkboxes[0] != val) {
      this.checkboxes[0] = val;
    } else {
      this.checkboxes = [];
    }
  }
}
