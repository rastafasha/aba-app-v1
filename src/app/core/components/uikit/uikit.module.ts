import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UikitRoutingModule } from './uikit.routing';
import { UikitComponent } from './uikit.component';

@NgModule({
  declarations: [UikitComponent],
  imports: [CommonModule, UikitRoutingModule],
})
export class UikitModule {}
