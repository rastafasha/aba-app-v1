import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../bip/components/components.module';
import { ClientReportRoutingModule } from './client-report.routing';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { ReportByClientComponent } from './report-by-client/report-by-client.component';
import { ClientReportComponent } from './client-report.component';
import { LayoutModule } from '../../../layout/layout.module';

@NgModule({
  declarations: [
    ReportByClientComponent,
    EmployeeReportComponent,
    ClientReportComponent,
  ],
  imports: [
    CommonModule,
    ClientReportRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    LayoutModule,
  ],
})
export class ClientReportModule {}
