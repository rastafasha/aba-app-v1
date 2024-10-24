import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll.routing';
import { PayrollComponent } from './payroll.component';

@NgModule({
  declarations: [PayrollComponent],
  imports: [CommonModule, PayrollRoutingModule],
})
export class PayrollModule {}
