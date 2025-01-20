import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-show917512',
    templateUrl: './show917512.component.html',
    styleUrls: ['./show917512.component.scss']
})
export class Show917512Component {
    @Input() show971512
    @Input() BCBA_conducted_client_observations
    @Input() $event
    @Input() BCBA_conducted_assessments
    @Input() note_selected

    @Output() bcbaclient2Change = new EventEmitter<boolean>();
    @Output() bcbaconducted2Change = new EventEmitter<boolean>();
  
    onCheckboxChange() {
      this.bcbaclient2Change.emit(this.BCBA_conducted_client_observations);
    }
    onCheckboxChange1() {
      this.bcbaconducted2Change.emit(this.BCBA_conducted_assessments);
    }
    
}