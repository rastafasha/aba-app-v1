import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Escape } from 'src/app/core/models';

@Component({
  selector: 'app-escape-form',
  templateUrl: './escape-form.component.html',
  styleUrls: ['./escape-form.component.scss'],
})
export class EscapeFormComponent {
  @Input() input: Escape;
  @Output() inputChange = new EventEmitter<Escape>();
  @Output() save = new EventEmitter<Escape>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
