import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recommendation } from 'src/app/core/models';

@Component({
  selector: 'app-recomendation-form',
  templateUrl: './recomendation-form.component.html',
  styleUrls: ['./recomendation-form.component.scss'],
})
export class RecomendationFormComponent {
  @Input() recomendation: Recommendation = Recommendation.getDefault();
  @Output() recomendationChange = new EventEmitter<Recommendation>();
  @Output() save = new EventEmitter<Recommendation>();
  @Output() cancel = new EventEmitter<void>();
  onSave() {
    this.recomendationChange.emit(this.recomendation);
    this.save.emit(this.recomendation);
  }
  onCancel() {
    this.cancel.emit();
  }
}
