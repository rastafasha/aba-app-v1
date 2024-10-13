import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { invoicesGrid } from 'src/app/shared/models/models';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-invoices-grid',
  templateUrl: './invoices-grid.component.html',
  styleUrls: ['./invoices-grid.component.scss'],
})
export class InvoicesGridComponent {
  routes = AppRoutes;
  checkboxes: string[] = [];
  invoicesGrid: Array<invoicesGrid>;

  openCheckBoxes(val: string) {
    if (this.checkboxes[0] != val) {
      this.checkboxes[0] = val;
    } else {
      this.checkboxes = [];
    }
  }
  constructor(public data: DataService) {
    this.invoicesGrid = this.data.invoicesGrid;
  }
}
