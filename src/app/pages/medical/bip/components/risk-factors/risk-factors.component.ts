import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RiskFactor } from 'src/app/core/models';

@Component({
  selector: 'app-risk-factors',
  templateUrl: './risk-factors.component.html',
  styleUrls: ['./risk-factors.component.scss'],
})
export class RiskFactorsComponent {
  @Input() risk_factors: RiskFactor;
  @Output() risk_factorsChange = new EventEmitter<RiskFactor>();
  @Output() save = new EventEmitter<RiskFactor>();

  onUpdate() {
    this.risk_factorsChange.emit(this.risk_factors);
    this.save.emit(this.risk_factors);
  }
}
