import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentV2 } from 'src/app/core/models';

@Component({
  selector: 'app-document-reviewed-form',
  templateUrl: './document-reviewed-form.component.html',
  styleUrls: ['./document-reviewed-form.component.scss'],
})
export class DocumentReviewedFormComponent {
  @Input() input: DocumentV2;
  @Output() inputChange = new EventEmitter<DocumentV2>();
  @Output() save = new EventEmitter<DocumentV2>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
