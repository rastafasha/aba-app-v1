import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplacementProtocol } from '../../interfaces';

@Component({
  selector: 'app-show91755',
  templateUrl: './show91755.component.html',
  styleUrls: ['./show91755.component.scss'],
})
export class Show91755Component {
  @Input() show97155;
  @Input() interventionsListDoble;
  @Input() replacementProtocols: ReplacementProtocol[] = [];
  @Input() modifications_needed_at_this_time;
  @Input() additional_goals_or_interventions;

  @Output() modificationsChange = new EventEmitter<boolean>();
  @Output() additionalChange = new EventEmitter<string>();
  @Output() interventions2Change = new EventEmitter<object>();
  @Output() protocolsChange = new EventEmitter<ReplacementProtocol[]>();

  onCheckboxChange() {
    this.modificationsChange.emit(this.modifications_needed_at_this_time);
  }

  onCheckboxChange1() {
    this.additionalChange.emit(this.additional_goals_or_interventions);
  }

  onInterventions2Change(event: object) {
    this.interventions2Change.emit(event);
  }

  onReplacementProtocolsChange(protocols: ReplacementProtocol[]) {
    this.protocolsChange.emit(protocols);
  }
}
