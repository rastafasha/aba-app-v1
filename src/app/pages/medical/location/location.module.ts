import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '../../../layout/layout.module';
import { LocationComponentsModule } from './components/components.module';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationViewComponent } from './location-view/location-view.component';
import { LocationComponent } from './location.component';
import { LocationRoutingModule } from './location.routing';

@NgModule({
  declarations: [
    LocationComponent,
    LocationAddComponent,
    LocationEditComponent,
    LocationListComponent,
    LocationViewComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    LocationComponentsModule,
    LayoutModule,
  ],
})
export class LocationModule {}
