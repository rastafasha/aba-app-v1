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
  @Output() save = new EventEmitter<void>();

  onSave() {
    this.bipChange.emit(this.bip);
    setTimeout(() => {
      this.save.emit();
    }, 0);
  }
}
