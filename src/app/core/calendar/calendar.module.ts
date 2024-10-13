import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar.routing';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, CalendarRoutingModule, SharedModule],
})
export class CalendarModule {}
