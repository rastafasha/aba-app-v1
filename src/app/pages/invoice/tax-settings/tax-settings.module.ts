import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxSettingsRoutingModule } from './tax-settings.routing';
import { TaxSettingsComponent } from './tax-settings.component';

@NgModule({
  declarations: [TaxSettingsComponent],
  imports: [CommonModule, TaxSettingsRoutingModule],
})
export class TaxSettingsModule {}
