import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogsReportsRoutingModule } from './logs-reports.routing';
import { LogReportsRenderComponent } from './logs-reports/log-reports-render/log-reports-render.component';
import { LogReportsSearchComponent } from './logs-reports/log-reports-search/log-reports-search.component';
import { LogReportsSummaryComponent } from './logs-reports/log-reports-summary/log-reports-summary.component';
import { LogsReportsComponent } from './logs-reports/logs-reports.component';

@NgModule({
  declarations: [
    LogsReportsComponent,
    LogReportsSearchComponent,
    LogReportsSummaryComponent,
    LogReportsRenderComponent,
  ],
  imports: [SharedModule, CoreModule, LogsReportsRoutingModule],
})
export class LogsReportsModule {}
