import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables.routing';
import { TablesComponent } from './tables.component';

@NgModule({
  declarations: [TablesComponent],
  imports: [CommonModule, TablesRoutingModule],
})
export class TablesModule {}
