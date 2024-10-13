import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss'],
})
export class AddSalaryComponent {
  routes = AppRoutes;
  selectedValue!: string;

  selectedList: data[] = [
    { value: 'Select Staff' },
    { value: 'Williams Bruk' },
    { value: 'Galaviz Lalema' },
  ];
}
