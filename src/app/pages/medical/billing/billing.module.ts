import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../bip/components/components.module';
import { BillingByClientComponent } from './billing-by-client/billing-by-client.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { BillingComponent } from './billing.component';
import { BillingRoutingModule } from './billing.routing';

@NgModule({
  declarations: [
    BillingComponent,
    BillingListComponent,
    BillingByClientComponent,
  ],
  exports: [BillingComponent, BillingListComponent, BillingByClientComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class BillingModule {}
