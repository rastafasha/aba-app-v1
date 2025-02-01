import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NoteRbtComponent } from './note-rbt/note-rbt.component';
import { NotesByClientComponent } from './notes-by-client/notes-by-client.component';
import { EditNoteRbtComponent } from './edit-note-rbt/edit-note-rbt.component';
import { NoteRbtViewComponent } from './note-rbt-view/note-rbt-view.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.noteRbt.noteRbt, 0, ':patient_id'),
        component: NoteRbtComponent,
      },
      {
        path: lastRoutes(AppRoutes.noteRbt.edit, 1, '/:id'),
        // component: EditNoteRbtComponent,
        component: NoteRbtComponent,
      },
      {
        path: lastRoutes(AppRoutes.noteRbt.list, 1, '/:id'),
        component: NotesByClientComponent,
      },
      {
        path: lastRoutes(AppRoutes.noteRbt.view, 1, '/:id'),
        component: NoteRbtViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
