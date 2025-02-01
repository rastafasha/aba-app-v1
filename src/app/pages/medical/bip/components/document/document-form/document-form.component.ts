import { Component, Input } from '@angular/core';
import { DocumentV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
})
export class DocumentFormComponent extends InputDirective<DocumentV2> {
  @Input() title = 'Document';
}
