import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePassword2RoutingModule } from './change-password.routing';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [CommonModule, ChangePassword2RoutingModule],
})
export class ChangePasswordModule {}
