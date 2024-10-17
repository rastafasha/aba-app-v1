import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-modal',
  templateUrl: 'action-modal.component.html',
  styleUrls: ['action-modal.component.scss'],
})
export class ActionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ActionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      patient: Record<string, unknown>;
      actions: { icon: string; buttonClass: string; onClick: () => void }[];
    }
  ) {}

  onActionClick(action: {
    icon: string;
    buttonClass: string;
    onClick: () => void;
  }) {
    action.onClick();
    this.dialogRef.close();
  }
}
