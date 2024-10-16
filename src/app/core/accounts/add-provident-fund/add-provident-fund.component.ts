import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-provident-fund',
  templateUrl: './add-provident-fund.component.html',
  styleUrls: ['./add-provident-fund.component.scss'],
})
export class AddProvidentFundComponent {
  public routes = AppRoutes;
  public selectedValue!: string;

  selectedList1: data[] = [
    { value: 'Select Employee Name' },
    { value: 'Bernardo James' },
    { value: 'Galaviz Lalema' },
    { value: 'Tarah Williams' },
  ];
  selectedList2: data[] = [
    { value: 'Select Provident Fund Type' },
    { value: 'Basic Salary' },
    { value: 'Month Salary' },
  ];
}
