import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-view91756',
    templateUrl: './view91756.component.html',
    styleUrls: ['./view91756.component.scss']
})
export class View91756Component {
    @Input() show97156
    @Input() interventions
    @Input() obj_inprogress
    @Input() behaviors
    @Input() note_selected
    @Input() caregivers_training_goals

    onInit() {
        console.log(this.caregivers_training_goals)
    }
}