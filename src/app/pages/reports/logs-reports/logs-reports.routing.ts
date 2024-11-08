import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsReportsComponent } from './logs-reports/logs-reports.component';

const routes: Routes = [
  {
    path: '',
    component: LogsReportsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsReportsRoutingModule {}
