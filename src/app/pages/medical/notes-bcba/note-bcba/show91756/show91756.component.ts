import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show91756',
  templateUrl: './show91756.component.html',
  styleUrls: ['./show91756.component.scss'],
})
export class Show91756Component {
  @Input() show97156;
  @Input() interventionsList;
  @Input() onInterventionsChange;
  @Input() $event;
  @Input() obj_inprogress;
  @Input() onReplacementChange;
  @Input() behaviorList;
  @Input() onBehaviorChange;
  @Input() cargiver_participation;
  @Input() was_the_client_present;
  @Input() asked_and_clarified_questions_about_the_implementation_of;
  @Input() reinforced_caregiver_strengths_in;
  @Input() gave_constructive_feedback_on;
  @Input() recomended_more_practice_on;
  @Input() caregivers_training_goals;
  @Input() caregivers_training_goalsgroup;

  @Output() cargiverChange = new EventEmitter<boolean>();
  @Output() wastheclientChange = new EventEmitter<boolean>();
  @Output() askedChange = new EventEmitter<string>();
  @Output() reinforcedChange = new EventEmitter<string>();
  @Output() gaveChange = new EventEmitter<string>();
  @Output() recomendedChange = new EventEmitter<string>();
  @Output() caregivers_training = new EventEmitter<string>();

  onCheckboxChange() {
    this.cargiverChange.emit(this.cargiver_participation);
  }
  onCheckboxChange1() {
    this.wastheclientChange.emit(this.was_the_client_present);
  }

  onCheckboxChange2() {
    this.askedChange.emit(this.asked_and_clarified_questions_about_the_implementation_of);
  }

  onCheckboxChange3() {
    this.reinforcedChange.emit(this.reinforced_caregiver_strengths_in);
  }
  onCheckboxChange4() {
    this.gaveChange.emit(this.gave_constructive_feedback_on);
  }
  onCheckboxChange5() {
    this.recomendedChange.emit(this.recomended_more_practice_on);
  }


  updateCaregiverGoal(id: number) {
    this.caregivers_training.emit(this.caregivers_training_goalsgroup[id]);
    // console.log('Caregiver goal updated:', this.caregivers_training[id]);
  }
}
