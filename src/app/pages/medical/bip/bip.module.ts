import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '../../../layout/layout.module';
import { BipEditComponent } from './bip-edit/bip-edit.component';
import { BipListComponent } from './bip-list/bip-list.component';
import { BipShowComponent } from './bip-show/bip-show.component';
import { BipComponent } from './bip.component';
import { BipRoutingModule } from './bip.routing';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    BipComponent,
    BipEditComponent,
    BipListComponent,
    BipShowComponent,
  ],
  exports: [BipComponent, BipEditComponent, BipListComponent, BipShowComponent],
  imports: [
    CommonModule,
    BipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    LayoutModule,
  ],
})
export class BipModule {}
