import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';
import { ClientLogReportComponent } from './client-log-report/client-log-report.component';
import { EditPatientMComponent } from './edit-patient-m/edit-patient-m.component';
import { ListPatientMComponent } from './list-patient-m/list-patient-m.component';
import { PatientMComponent } from './patient-m.component';
import { ProfilePatientMComponent } from './profile-patient-m/profile-patient-m.component';
import { AddPatientMComponent } from './add-patient-m/add-patient-m.component';

const routes: Routes = [
  {
    path: '',
    component: PatientMComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.patients.add),
        component: AddPatientMComponent,
      },
      {
        path: lastRoutes(AppRoutes.patients.list),
        component: ListPatientMComponent,
      },
      {
        path: lastRoutes(AppRoutes.patients.logReport),
        component: ClientLogReportComponent,
      },
      {
        path: lastRoutes(AppRoutes.patients.listEdit, 2, '/:id'),
        component: EditPatientMComponent,
      },
      {
        path: lastRoutes(AppRoutes.patients.profile, 1, '/:id'),
        component: ProfilePatientMComponent,
      },
      {
        path: lastRoutes(
          AppRoutes.patients.profileByPatientId,
          1,
          '/:patient_id'
        ),
        component: ProfilePatientMComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientMRoutingModule {}
