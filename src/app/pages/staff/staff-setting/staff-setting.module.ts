import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffSettingRoutingModule } from './staff-setting.routing';
import { StaffSettingComponent } from './staff-setting.component';

@NgModule({
  declarations: [StaffSettingComponent],
  imports: [CommonModule, StaffSettingRoutingModule],
})
export class StaffSettingModule {}
