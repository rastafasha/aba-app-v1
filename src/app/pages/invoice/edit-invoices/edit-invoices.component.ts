import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-invoices',
  templateUrl: './edit-invoices.component.html',
  styleUrls: ['./edit-invoices.component.scss'],
})
export class EditInvoicesComponent {
  routes = AppRoutes;
  checkboxes: string[] = [];
  itemDetails: number[] = [0];
  chargesArray: number[] = [0];
  recurringInvoice = false;
  selectedValue!: string;
  date = new FormControl(new Date());

  openCheckBoxes(val: string) {
    if (this.checkboxes[0] != val) {
      this.checkboxes[0] = val;
    } else {
      this.checkboxes = [];
    }
  }
  addItem() {
    this.itemDetails.push(0);
  }
  deleteItem(index: number) {
    this.itemDetails.splice(index, 1);
  }
  addCharges() {
    this.chargesArray.push(1);
  }
  deleteCharges(index: number) {
    this.chargesArray.splice(index, 1);
  }
  recurringInvoiceFunc() {
    this.recurringInvoice = !this.recurringInvoice;
  }
  selecedList: data[] = [
    { value: 'By month' },
    { value: 'March' },
    { value: 'April' },
    { value: 'May' },
    { value: 'June' },
    { value: 'July' },
  ];
}
