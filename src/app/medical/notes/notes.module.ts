import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteRbtComponent } from './note-rbt/note-rbt.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../bip/components/components.module';
import { NotesComponent } from './notes.component';
import { NotesByClientComponent } from './notes-by-client/notes-by-client.component';
import { EditNoteRbtComponent } from './edit-note-rbt/edit-note-rbt.component';
import { NoteRbtViewComponent } from './note-rbt-view/note-rbt-view.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MaladaptivesComponent } from './components/maladaptives/maladaptives.component';
import { ReplacementsComponent } from './components/replacements/replacements.component';
import { InterventionsComponent } from './components/interventions/interventions.component';


@NgModule({
  declarations: [
    NotesComponent,
    NoteRbtComponent,
    NotesByClientComponent,
    EditNoteRbtComponent,
    NoteRbtViewComponent,
    MaladaptivesComponent,
    ReplacementsComponent,
    InterventionsComponent,
  ],
  exports: [
    NotesComponent,
    NoteRbtComponent,
    NotesByClientComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    PipesModule
  ]
})
export class NotesModule { }
