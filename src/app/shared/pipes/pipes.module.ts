import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArrayFilterPipe } from './array-filter.pipe';
import { CeilPipe } from './ceil.pipe';
import { FloorPipe } from './floor.pipe';
import { LocationFilterPipe } from './location-filter.pipe';
import { MaxPipe } from './max.pipe';
import { MinPipe } from './min.pipe';
import { GetPrizeCptNotePipe } from './prize-cpt.pipe';
import { RoleFilterPipe } from './roles-filter.pipe';
import { SecureResourceUrlPipe } from './secure-resource-url.pipe';
import { TransformToDatePipe } from './transform-to-date.pipe';

const components = [
  ArrayFilterPipe,
  SecureResourceUrlPipe,
  TransformToDatePipe,
  RoleFilterPipe,
  LocationFilterPipe,
  GetPrizeCptNotePipe,
  MinPipe,
  MaxPipe,
  CeilPipe,
  FloorPipe,
];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule],
})
export class PipesModule {}
