import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location.routing';
import { LocationComponent } from './location.component';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationListComponent } from './location-list/location-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationViewComponent } from './location-view/location-view.component';
import { LogNotasComponent } from './components/log-notas/log-notas.component';
import { CompModule } from './components/comp.module';

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
    CompModule,
  ],
})
export class LocationModule {}
