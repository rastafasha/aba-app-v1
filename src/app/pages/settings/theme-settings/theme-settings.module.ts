import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeSettingsRoutingModule } from './theme-settings.routing';
import { ThemeSettingsComponent } from './theme-settings.component';

@NgModule({
  declarations: [ThemeSettingsComponent],
  imports: [CommonModule, ThemeSettingsRoutingModule],
})
export class ThemeSettingsModule {}
