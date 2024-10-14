import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: lastRoutes(AppRoutes.dashboard.admin),
        pathMatch: 'full',
      },
      {
        path: lastRoutes(AppRoutes.dashboard.admin),
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },
      {
        path: lastRoutes(AppRoutes.dashboard.doctor),
        loadChildren: () =>
          import('./doctor-dashboard/doctor-dashboard.module').then(
            (m) => m.DoctorDashboardModule
          ),
      },
      {
        path: lastRoutes(AppRoutes.dashboard.patient),
        loadChildren: () =>
          import('./patient-dashboard/patient-dashboard.module').then(
            (m) => m.PatientDashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
