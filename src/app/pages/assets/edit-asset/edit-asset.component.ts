import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss'],
})
export class EditAssetComponent {
  routes = AppRoutes;
  selectedValue!: string;
  date = new FormControl(new Date());

  selectedList1: data[] = [
    { value: 'Select Asset User' },
    { value: 'Williams Bruk' },
    { value: 'Galaviz Lalema' },
  ];
  selectedList2: data[] = [
    { value: 'Select Status' },
    { value: 'Pending' },
    { value: 'Approved' },
    { value: 'Returned' },
  ];
}
