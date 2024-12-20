import { Component, Input } from '@angular/core';
import { NoteBcbaService } from 'src/app/core/services/notes-bcba.service';
import { NoteRbtService } from 'src/app/core/services/notes-rbt.service';

@Component({
  selector: 'app-pdf-button',
  template: `
    <button class="btn btn-info follow-btns" (click)="getPdf()">
      Export PDF
    </button>
  `
})
export class PdfButtonComponent {
  @Input() noteType: 'rbt' | 'bcba';
  @Input() noteId: number;

  constructor(
    private noteBcbaService: NoteBcbaService,
    private noteRbtService: NoteRbtService
  ) {}

  getPdf(): void {
    const service = this.noteType === 'rbt' ? this.noteRbtService : this.noteBcbaService;

    service.getPdf(this.noteId).subscribe({
      next: (response) => {
        // Create blob from response
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Open PDF in new tab
        window.open(url, '_blank');

        // Clean up
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error getting PDF:', error);
      }
    });
  }
}
