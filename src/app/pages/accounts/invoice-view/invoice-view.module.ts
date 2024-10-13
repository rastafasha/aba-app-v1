import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceViewRoutingModule } from './invoice-view.routing';
import { InvoiceViewComponent } from './invoice-view.component';

@NgModule({
  declarations: [InvoiceViewComponent],
  imports: [CommonModule, InvoiceViewRoutingModule],
})
export class InvoiceViewModule {}
