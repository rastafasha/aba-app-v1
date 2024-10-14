import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorsComponent } from './doctors.component';
import { ProfileDoctorComponent } from './profile-doctor/profile-doctor.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.doctors.add),
        component: AddDoctorComponent,
      },
      {
        path: lastRoutes(AppRoutes.doctors.list),
        component: ListDoctorComponent,
      },
      {
        path: lastRoutes(AppRoutes.doctors.list, 2, '/:id'),
        component: EditDoctorComponent,
      },
      {
        path: lastRoutes(AppRoutes.doctors.profile, 2, '/:id'),
        component: ProfileDoctorComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
