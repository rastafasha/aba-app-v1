import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlankPageComponent } from './blank-page.component';
import { BlankPageRoutingModule } from './blank-page.routing';

@NgModule({
  declarations: [BlankPageComponent],
  imports: [CommonModule, BlankPageRoutingModule],
})
export class BlankPageModule {}
