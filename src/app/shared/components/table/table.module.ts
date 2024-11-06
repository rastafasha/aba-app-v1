import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PagesPipe } from './pipes/pages.pipe';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableUtilsService } from './table-utils.service';

@NgModule({
  declarations: [TableFooterComponent, PagesPipe],
  exports: [TableFooterComponent],
  imports: [CommonModule, MaterialModule, PipesModule],
  providers: [TableUtilsService],
})
export class TableModule {}
