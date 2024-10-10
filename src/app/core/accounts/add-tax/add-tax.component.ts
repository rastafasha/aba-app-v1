import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss'],
})
export class AddTaxComponent {
  public routes = AppRoutes;
  public selectedValue!: string;

  selectedList: data[] = [
    { value: 'Select Tax Method' },
    { value: 'Active' },
    { value: 'In Active' },
    { value: '2019' },
  ];
}
