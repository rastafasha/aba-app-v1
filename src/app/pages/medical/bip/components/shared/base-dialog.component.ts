import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: '',
})
export class BaseDialogComponent<T> {
  @Input() input: T;
  @Output() inputChange = new EventEmitter<T>();
  @Output() save = new EventEmitter<T>();
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
