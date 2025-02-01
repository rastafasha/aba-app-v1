import { Component, Input } from '@angular/core';
import { NoteBcbaV2 } from 'src/app/core/models/v2/note-bcba.v2.model';

@Component({
    selector: 'app-view917511',
    templateUrl: './view917511.component.html',
    styleUrls: ['./view917511.component.scss']
})
export class View917511Component {
    @Input() show971511: boolean;
    @Input() note_selected: NoteBcbaV2;
    @Input() newlist_added: string[];
    @Input() intake_outcome: string[];
    @Input() assessment_tools_used: string[];
}
