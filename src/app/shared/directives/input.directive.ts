import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInput]',
})
export class InputDirective<T> {
  @Input() input: T;
  @Output() inputChange = new EventEmitter<T>();
  //
  @Output() save = new EventEmitter<T>();
  @Output() cancel = new EventEmitter<void>();
  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
