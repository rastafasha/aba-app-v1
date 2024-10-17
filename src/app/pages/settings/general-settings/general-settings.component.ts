import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent {
  routes = AppRoutes;
  deleteIcon1 = true;
  deleteIcon2 = true;
  selectedValue!: string;

  deleteIconFunc1() {
    this.deleteIcon1 = !this.deleteIcon1;
  }
  deleteIconFunc2() {
    this.deleteIcon2 = !this.deleteIcon2;
  }

  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'California' },
    { value: 'Tasmania' },
    { value: 'Auckland' },
    { value: 'Marlborough' },
  ];
  selectedList2: data[] = [
    { value: 'India' },
    { value: 'London' },
    { value: 'France' },
    { value: 'USA' },
  ];
}
