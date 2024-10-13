import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryViewRoutingModule } from './salary-view.routing';
import { SalaryViewComponent } from './salary-view.component';

@NgModule({
  declarations: [SalaryViewComponent],
  imports: [CommonModule, SalaryViewRoutingModule],
})
export class SalaryViewModule {}
