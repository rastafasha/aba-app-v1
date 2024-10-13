import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorSettingRoutingModule } from './doctor-setting.routing';
import { DoctorSettingComponent } from './doctor-setting.component';

@NgModule({
  declarations: [DoctorSettingComponent],
  imports: [CommonModule, DoctorSettingRoutingModule],
})
export class DoctorSettingModule {}
