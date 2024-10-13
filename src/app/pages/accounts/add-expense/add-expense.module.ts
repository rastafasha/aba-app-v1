import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseRoutingModule } from './add-expense.routing';
import { AddExpenseComponent } from './add-expense.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddExpenseComponent],
  imports: [CommonModule, AddExpenseRoutingModule, SharedModule],
})
export class AddExpenseModule {}
