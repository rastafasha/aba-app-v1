import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims.routing';
import { ClaimsComponent } from './claims.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [ClaimsComponent],
  imports: [CommonModule, ClaimsRoutingModule, SharedModule, LayoutModule],
})
export class ClaimsModule {}
