import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-with-boolean',
  templateUrl: './card-with-boolean.component.html',
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-with-boolean',
  templateUrl: './card-with-boolean.component.html',
  styleUrls: ['./card-with-boolean.component.scss']
})
export class CardWithBooleanComponent {
  @Input() note_selected: any; // Replace 'any' with the actual type if available
}
