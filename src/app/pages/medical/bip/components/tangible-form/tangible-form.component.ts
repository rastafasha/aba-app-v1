import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tangible } from 'src/app/core/models';

@Component({
  selector: 'app-tangible-form',
  templateUrl: './tangible-form.component.html',
  styleUrls: ['./tangible-form.component.scss'],
})
export class TangibleFormComponent {
  @Input() input: Tangible;
  @Output() inputChange = new EventEmitter<Tangible>();
  @Output() save = new EventEmitter<Tangible>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
