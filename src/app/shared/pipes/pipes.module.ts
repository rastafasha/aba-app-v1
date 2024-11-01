import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformToDatePipe } from './transform-to-date.pipe';
import { RoleFilterPipe } from './roles-filter.pipe';
import { LocationFilterPipe } from './location-filter.pipe';
import { GetPrizeCptNotePipe } from './prize-cpt.pipe';
import { SecureResourceUrlPipe } from './secure-resource-url.pipe';
import { MinPipe } from './min.pipe';
import { MaxPipe } from './max.pipe';
import { CeilPipe } from './ceil.pipe';
import { FloorPipe } from './floor.pipe';

@NgModule({
  declarations: [
    SecureResourceUrlPipe,
    TransformToDatePipe,
    RoleFilterPipe,
    LocationFilterPipe,
    GetPrizeCptNotePipe,
    MinPipe,
    MaxPipe,
    CeilPipe,
    FloorPipe,
  ],
  exports: [
    SecureResourceUrlPipe,
    TransformToDatePipe,
    RoleFilterPipe,
    LocationFilterPipe,
    GetPrizeCptNotePipe,
    MinPipe,
    MaxPipe,
    CeilPipe,
    FloorPipe,
  ],
  imports: [CommonModule],
})
export class PipesModule {}
