import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';
import { ClientReportComponent } from './client-report.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { ReportByClientComponent } from './report-by-client/report-by-client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientReportComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.clientReport.byClient, 1, '/:patient_id'),
        component: ReportByClientComponent,
      },
      {
        path: lastRoutes(
          AppRoutes.clientReport.employeeByClient,
          1,
          '/:patient_id'
        ),
        component: EmployeeReportComponent,
      },
      // {
      //   path:'attention/:id', component:BipattentionComponent
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientReportRoutingModule {}
