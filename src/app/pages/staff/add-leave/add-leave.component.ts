import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss'],
})
export class AddLeaveComponent {
  routes = AppRoutes;
  selectedValue!: string;
  selectedList: data[] = [
    { value: 'Select Leave Type' },
    { value: 'Medical Leave' },
    { value: 'Casual Leave' },
    { value: 'Loss of Pay' },
  ];
}
