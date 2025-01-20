import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RiskFactor } from 'src/app/core/models';

@Component({
  selector: 'app-risk-factors',
  templateUrl: './risk-factors.component.html',
  styleUrls: ['./risk-factors.component.scss'],
})
export class RiskFactorsComponent {
  @Input() input: RiskFactor;
  @Output() inputChange = new EventEmitter<RiskFactor>();
  @Output() save = new EventEmitter<RiskFactor>();

  onUpdate() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
