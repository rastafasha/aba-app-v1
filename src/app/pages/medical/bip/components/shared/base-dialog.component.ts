import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: '',
})
export class BaseDialogComponent {
  @Input() input: any;
  @Output() inputChange = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(protected dialogRef?: MatDialogRef<any>) {}

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
    if (this.dialogRef) {
      this.dialogRef.close(this.input);
    }
  }

  onCancel() {
    this.cancel.emit();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
