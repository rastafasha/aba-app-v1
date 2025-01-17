import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show917511',
  templateUrl: './show917511.component.html',
  styleUrls: ['./show917511.component.scss'],
})
export class Show917511Component {
  @Input() show971511;
  @Input() BCBA_conducted_client_observations;
  @Input() $event;
  @Input() BCBA_conducted_assessments;
  @Input() newList;
  @Input() onNewListChange;
  @Input() outcomeList;
  @Input() onIntakeoutcomeChange;

  @Output() bcbaconductedChange = new EventEmitter<boolean>();
  @Output() bcbaclientChange = new EventEmitter<boolean>();

  onCheckboxChange() {
    this.bcbaconductedChange.emit(this.BCBA_conducted_client_observations);
  }
  onCheckboxChange1() {
    this.bcbaclientChange.emit(this.BCBA_conducted_assessments);
  }
}
