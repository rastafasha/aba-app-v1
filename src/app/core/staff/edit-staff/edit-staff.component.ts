import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent {
  public routes = AppRoutes;
  public deleteIcon = true;
  public selectedValue!: string;
  deleteIconFunc() {
    this.deleteIcon = !this.deleteIcon;
  }
  selectedList1: data[] = [
    { value: 'Select  Department' },
    { value: 'Orthopedics' },
    { value: 'Radiology' },
    { value: 'Dentist' },
  ];
  selectedList2: data[] = [
    { value: 'Select City' },
    { value: 'Alaska' },
    { value: 'California' },
  ];
  selectedList3: data[] = [
    { value: 'Select Country' },
    { value: 'Usa' },
    { value: 'Uk' },
    { value: 'Italy' },
  ];
  selectedList4: data[] = [
    { value: 'Select State' },
    { value: 'Alaska' },
    { value: 'California' },
  ];
}
