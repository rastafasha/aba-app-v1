import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email.routing';
import { EmailComponent } from './email.component';

@NgModule({
  declarations: [EmailComponent],
  imports: [CommonModule, EmailRoutingModule],
})
export class EmailModule {}
