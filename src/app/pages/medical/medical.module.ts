import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from './bip/components/components.module';
import { MedicalComponent } from './medical.component';
import { MedicalRoutingModule } from './medical.routing';

@NgModule({
  declarations: [MedicalComponent],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
  ],
})
export class MedicalModule {}
