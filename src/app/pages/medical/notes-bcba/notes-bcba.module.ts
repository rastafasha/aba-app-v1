import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../bip/components/components.module';
import { NoteBcbaByClientComponent } from './note-bcba-by-client/note-bcba-by-client.component';
import { NoteBcbaEditComponent } from './note-bcba-edit/note-bcba-edit.component';
import { NoteBcbaViewComponent } from './note-bcba-view/note-bcba-view.component';
import { NoteBcbaComponent } from './note-bcba/note-bcba.component';
import { NotesBcbaComponent } from './notes-bcba.component';
import { NotesBcbaRoutingModule } from './notes-bcba.routing';

@NgModule({
  declarations: [
    NotesBcbaComponent,
    NoteBcbaViewComponent,
    NoteBcbaByClientComponent,
    NoteBcbaEditComponent,
    NoteBcbaComponent,
  ],
  exports: [
    NotesBcbaComponent,
    NoteBcbaViewComponent,
    NoteBcbaByClientComponent,
    NoteBcbaEditComponent,
  ],
  imports: [
    CommonModule,
    NotesBcbaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
  ],
})
export class NotesBcbaModule {}