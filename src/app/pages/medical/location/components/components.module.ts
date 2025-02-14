import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsLocationComponent } from './clients-location/clients-location.component';
import { LogNotasRenderComponent } from './log-notas/log-notas-render/log-notas-render.component';
import { LogNotasSearchComponent } from './log-notas/log-notas-search/log-notas-search.component';
import { LogNotasTotalComponent } from './log-notas/log-notas-total/log-notas-total.component';
import { LogNotasComponent } from './log-notas/log-notas.component';
import { SpecialistLocationComponent } from './specialist-location/specialist-location.component';
import { LogNotasSessionTotalPipe } from './log-notas/pipes/log-notas-session-total.pipe';
import { LogNotasUnitPricePipe } from './log-notas/pipes/log-notas-unit-price.pipe';

const components = [
  LogNotasComponent,
  SpecialistLocationComponent,
  ClientsLocationComponent,
];
@NgModule({
  declarations: [
    ...components,
    LogNotasSearchComponent,
    LogNotasTotalComponent,
    LogNotasRenderComponent,
    LogNotasSessionTotalPipe,
    LogNotasUnitPricePipe,
  ],
  exports: [...components],
  imports: [SharedModule],
})
export class LocationComponentsModule {}
