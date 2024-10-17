import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogNotasComponent } from './log-notas/log-notas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationRoutingModule } from '../location.routing';
import { SpecialistLocationComponent } from './specialist-location/specialist-location.component';
import { ClientsLocationComponent } from './clients-location/clients-location.component';

@NgModule({
  declarations: [
    LogNotasComponent,
    SpecialistLocationComponent,
    ClientsLocationComponent,
  ],
  exports: [
    LogNotasComponent,
    SpecialistLocationComponent,
    ClientsLocationComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
})
export class CompModule {}
