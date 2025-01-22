import { Component } from '@angular/core';
import { DOCUMENT_STATUS_MAP, DocumentV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-document-reviewed-form',
  templateUrl: './document-reviewed-form.component.html',
  styleUrls: ['./document-reviewed-form.component.scss'],
})
export class DocumentReviewedFormComponent extends InputDirective<DocumentV2> {
  states = DOCUMENT_STATUS_MAP;
}
