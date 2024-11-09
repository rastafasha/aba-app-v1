import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: lastRoutes(AppRoutes.reports.logs),
        pathMatch: 'full',
      },
      {
        path: lastRoutes(AppRoutes.reports.logs),
        loadChildren: () =>
          import('./logs-reports/logs-reports.module').then(
            (m) => m.LogsReportsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
