import { Component, Input } from '@angular/core';
import { MaladaptivesData, NoteBcbaV2 } from 'src/app/core/models/v2/note-bcba.v2.model';
import { Protocol, PlanProtocol } from 'src/app/core/models/notes.model';

@Component({
    selector: 'app-view91755',
    templateUrl: './view91755.component.html',
    styleUrls: ['./view91755.component.scss']
})
export class View91755Component {
    @Input() show97155: boolean;
    @Input() maladaptives: MaladaptivesData;
    @Input() wasTheRbtPresent: boolean;
    @Input() interventions2: Protocol[];
    @Input() obj_inprogress: PlanProtocol[];
    @Input() note_selected: NoteBcbaV2;
}
