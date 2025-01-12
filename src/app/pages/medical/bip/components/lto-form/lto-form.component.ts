import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective } from 'src/app/core/models';

@Component({
  selector: 'app-lto-form',
  templateUrl: './lto-form.component.html',
  styleUrls: ['./lto-form.component.scss'],
})
export class LtoFormComponent {
  @Input() lto: Objective;
  @Output() ltoChange = new EventEmitter<Objective>();
  @Output() save = new EventEmitter<Objective>();

  onSave() {
    this.ltoChange.emit(this.lto);
    this.save.emit(this.lto);
  }
}
