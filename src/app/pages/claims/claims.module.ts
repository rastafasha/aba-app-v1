import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims.routing';
import { ClaimsComponent } from './claims.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [ClaimsComponent],
  imports: [CommonModule, ClaimsRoutingModule, SharedModule, CoreModule],
})
export class ClaimsModule {}
