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
import { LogNotasSearchComponent } from './log-notas/log-notas-search/log-notas-search.component';
import { LogNotasTotalComponent } from './log-notas/log-notas-total/log-notas-total.component';

const components = [
  LogNotasComponent,
  SpecialistLocationComponent,
  ClientsLocationComponent,
  LogNotasSearchComponent,
];
@NgModule({
  declarations: [...components, LogNotasTotalComponent],
  exports: [...components],
  imports: [SharedModule],
})
export class LocationComponentsModule {}
