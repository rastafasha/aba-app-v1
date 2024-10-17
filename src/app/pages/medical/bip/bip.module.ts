import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BipRoutingModule } from './bip.routing';
import { BipComponent } from './bip.component';
import { BipattentionComponent } from './bipattention/bipattention.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BipListComponent } from './bip-list/bip-list.component';
import { BipProfileComponent } from './bip-profile/bip-profile.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    BipComponent,
    BipattentionComponent,
    BipListComponent,
    BipProfileComponent,
  ],
  exports: [
    BipComponent,
    BipattentionComponent,
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
  ],
})
export class BipModule {}
