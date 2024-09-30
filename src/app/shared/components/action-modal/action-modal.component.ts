import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-modal',
  template: `
    <h2 mat-dialog-title><strong>Actions for {{ data.patient['last_name'] }} {{ data.patient['last_name'] }}</strong></h2>
    <mat-dialog-content>
      <div class="button-container">
        <ng-container *ngFor="let action of data.actions">
          <app-action-button
            [title]="action.title"
            [icon]="action.icon"
            [buttonClass]="action.buttonClass"
            (clicked)="onActionClick(action)">
          </app-action-button>
        </ng-container>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .button-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `]
})
export class ActionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patient: Record<string, unknown>; actions: { icon: string; buttonClass: string; onClick: () => void; }[] }
  ) { }

  onActionClick(action: { icon: string; buttonClass: string; onClick: () => void; }) {
    action.onClick();
    this.dialogRef.close();
  }
}