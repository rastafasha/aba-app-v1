import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-with-boolean',
  templateUrl: './card-with-boolean.component.html',
  // styleUrls: ['./card-with-boolean.component.scss']
})
export class CardWithBooleanComponent {
  @Input() value: boolean;
  @Input() title: string;
}
