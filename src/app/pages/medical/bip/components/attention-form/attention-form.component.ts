import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attention } from 'src/app/core/models';

@Component({
  selector: 'app-attention-form',
  templateUrl: './attention-form.component.html',
  styleUrls: ['./attention-form.component.scss'],
})
export class AttentionFormComponent {
  @Input() input: Attention;
  @Output() inputChange = new EventEmitter<Attention>();
  @Output() save = new EventEmitter<Attention>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
