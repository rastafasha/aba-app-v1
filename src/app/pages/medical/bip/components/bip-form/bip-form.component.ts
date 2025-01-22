import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BipV2 } from 'src/app/core/models';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-bip-form',
  templateUrl: './bip-form.component.html',
  styleUrls: ['./bip-form.component.scss'],
})
export class BipFormComponent {
  routes = AppRoutes;
  @Input() bip: BipV2;
  @Output() bipChange = new EventEmitter<BipV2>();
  @Output() save = new EventEmitter<BipV2>();

  onSave() {
    this.bipChange.emit(this.bip);
    this.save.emit(this.bip);
  }
}
