import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../bip/components/components.module';
import { InterventionsOptionComponent } from './components/interventions/interventions.component';
import { MaladaptivesOptionsComponent } from './components/maladaptives/maladaptives.component';
import { ReplacementsComponent } from './components/replacements/replacements.component';
import { EditNoteRbtComponent } from './edit-note-rbt/edit-note-rbt.component';
import { NoteRbtViewComponent } from './note-rbt-view/note-rbt-view.component';
import { NoteRbtComponent } from './note-rbt/note-rbt.component';
import { NotesByClientComponent } from './notes-by-client/notes-by-client.component';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes.routing';
import { InterventionviewsComponent } from './note-rbt-view/interventionviews/interventionviews.component';


@NgModule({
  declarations: [
    InterventionviewsComponent,
    NotesComponent,
    NoteRbtComponent,
    NotesByClientComponent,
    EditNoteRbtComponent,
    NoteRbtViewComponent,
    MaladaptivesOptionsComponent,
    ReplacementsComponent,
    InterventionsOptionComponent,
  ],
  exports: [
    NotesComponent,
    NoteRbtComponent,
    NotesByClientComponent,
    MaladaptivesOptionsComponent,
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
    PipesModule,
    LayoutModule,
  ],
})
export class NotesModule {}
