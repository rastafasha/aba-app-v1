import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective } from 'src/app/core/models';

@Component({
  selector: 'app-sto-form',
  templateUrl: './sto-form.component.html',
  styleUrls: ['./sto-form.component.scss'],
})
export class StoFormComponent {
  @Input() sto: Objective;
  @Output() stoChange = new EventEmitter<Objective>();
  @Output() save = new EventEmitter<Objective>();

  onSave() {
    this.stoChange.emit(this.sto);
    this.save.emit(this.sto);
  }
}
