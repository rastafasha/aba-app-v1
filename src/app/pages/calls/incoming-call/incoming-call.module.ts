import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomingCallRoutingModule } from './incoming-call.routing';
import { IncomingCallComponent } from './incoming-call.component';

@NgModule({
  declarations: [IncomingCallComponent],
  imports: [CommonModule, IncomingCallRoutingModule],
})
export class IncomingCallModule {}
