import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';
import { PagesRoutingModule } from './pages.routing';

@NgModule({
  declarations: [],
  imports: [PagesRoutingModule, CoreModule, LayoutModule],
  exports: [],
  providers: [],
})
export class PagesModule {}
