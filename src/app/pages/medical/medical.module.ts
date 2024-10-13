import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical.routing';
import { MedicalComponent } from './medical.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientReportComponent } from './client-report/client-report.component';
import { ComponentsModule } from './bip/components/components.module';

@NgModule({
  declarations: [MedicalComponent, ClientReportComponent],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
  ],
})
export class MedicalModule {}
