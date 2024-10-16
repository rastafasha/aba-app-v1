import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss'],
})
export class EditDepartmentComponent {
  public routes = AppRoutes;
}
