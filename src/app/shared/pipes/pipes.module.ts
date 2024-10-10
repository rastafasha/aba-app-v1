import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformToDatePipe } from './transform-to-date.pipe';
import { RoleFilterPipe } from './roles-filter.pipe';
import { LocationFilterPipe } from './location-filter.pipe';
import { GetPrizeCptNotePipe } from './prize-cpt.pipe';
import { SecureResourceUrlPipe } from './secure-resource-url.pipe';

@NgModule({
  declarations: [
    SecureResourceUrlPipe,
    TransformToDatePipe,
    RoleFilterPipe,
    LocationFilterPipe,
    GetPrizeCptNotePipe,
  ],
  exports: [
    SecureResourceUrlPipe,
    TransformToDatePipe,
    RoleFilterPipe,
    LocationFilterPipe,
    GetPrizeCptNotePipe,
  ],
  imports: [CommonModule],
})
export class PipesModule {}
