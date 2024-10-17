import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDoctorRoutingModule } from './add-doctor.routing';
import { AddDoctorComponent } from './add-doctor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [AddDoctorComponent],
  imports: [CommonModule, AddDoctorRoutingModule, SharedModule, MaterialModule],
})
export class AddDoctorModule {}
