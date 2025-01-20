import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suicidality } from 'src/app/core/models';

@Component({
  selector: 'app-suicidalities',
  templateUrl: './suicidalities.component.html',
  styleUrls: ['./suicidalities.component.scss'],
})
export class SuicidalitiesComponent {
  @Input() suicidalities: Suicidality;
  @Output() suicidalitiesChange = new EventEmitter<Suicidality>();
  @Output() save = new EventEmitter<Suicidality>();
  onSave() {
    this.suicidalitiesChange.emit(this.suicidalities);
    this.save.emit(this.suicidalities);
  }
}
