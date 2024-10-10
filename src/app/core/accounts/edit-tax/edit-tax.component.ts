import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-tax',
  templateUrl: './edit-tax.component.html',
  styleUrls: ['./edit-tax.component.scss'],
})
export class EditTaxComponent {
  public routes = AppRoutes;
  public selectedValue!: string;
  selectedList: data[] = [
    { value: 'Select Tax Method' },
    { value: 'Active' },
    { value: '2020' },
    { value: 'In Active' },
  ];
}
