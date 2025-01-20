import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Homicidality } from 'src/app/core/models';

@Component({
  selector: 'app-homicidalities',
  templateUrl: './homicidalities.component.html',
  styleUrls: ['./homicidalities.component.scss'],
})
export class HomicidalitiesComponent {
  @Input() homicidalities: Homicidality;
  @Output() homicidalitiesChange = new EventEmitter<Homicidality>();
  @Output() save = new EventEmitter<Homicidality>();
  onSave() {
    this.homicidalitiesChange.emit(this.homicidalities);
    this.save.emit(this.homicidalities);
  }
}
