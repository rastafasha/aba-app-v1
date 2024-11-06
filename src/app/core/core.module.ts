import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
//
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth/auth.service';
import { CoreComponent } from './core.component';

@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, SharedModule, LayoutModule],
  exports: [CoreComponent],
  providers: [AuthService],
})
export class CoreModule {}
