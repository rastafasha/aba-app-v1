import { Component, Input } from '@angular/core';
import { NoteBcbaV2 } from 'src/app/core/models/v2/note-bcba.v2.model';
import { Protocol, DiscussedPlanProtocol, CaregiverGoalProtocol, PlanProtocol } from 'src/app/core/models/notes.model';

@Component({
    selector: 'app-view91756',
    templateUrl: './view91756.component.html',
    styleUrls: ['./view91756.component.scss']
})
export class View91756Component {
    @Input() show97156: boolean;
    @Input() interventions: Protocol[];
    @Input() replacements: PlanProtocol[];
    @Input() behaviors: DiscussedPlanProtocol[];
    @Input() note_selected: NoteBcbaV2;
    @Input() caregivers_training_goals: CaregiverGoalProtocol[];

    onInit() {
        console.log(this.caregivers_training_goals)
    }
}
