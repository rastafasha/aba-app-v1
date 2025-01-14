import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '../../../layout/layout.module';
import { BipAttentionComponent } from './bip-attention/bip-attention.component';
import { BipListComponent } from './bip-list/bip-list.component';
import { BipProfileComponent } from './bip-profile/bip-profile.component';
import { BipComponent } from './bip.component';
import { BipRoutingModule } from './bip.routing';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    BipComponent,
    BipAttentionComponent,
    BipListComponent,
    BipProfileComponent,
  ],
  exports: [
    BipComponent,
    BipAttentionComponent,
    BipListComponent,
    BipProfileComponent,
  ],
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
