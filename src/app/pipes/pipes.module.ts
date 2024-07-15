import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureResourceUrlPipe } from './secure-resource-url.pipe';
import { TransformToDatePipe } from './transform-to-date.pipe';
import { RoleFilterPipe } from './roles-filter.pipe';
import { LocationFilterPipe } from './location-filter.pipe';



@NgModule({
  declarations: [
    SecureResourceUrlPipe,
    TransformToDatePipe,
    RoleFilterPipe,
    LocationFilterPipe
  ],
  exports: [
    SecureResourceUrlPipe,
    TransformToDatePipe,
    RoleFilterPipe,
    LocationFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
