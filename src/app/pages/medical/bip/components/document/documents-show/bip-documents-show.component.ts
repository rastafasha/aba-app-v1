import { Component, Input } from '@angular/core';
import { DocumentV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-documents-show',
  templateUrl: './bip-documents-show.component.html',
  styleUrls: ['./bip-documents-show.component.scss'],
})
export class BipDocumentsShowComponent {
  @Input() documents: DocumentV2[];
}
