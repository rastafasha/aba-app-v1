import { Component, Input } from '@angular/core';
import { NoteBcbaV2 } from 'src/app/core/models/v2/note-bcba.v2.model';

@Component({
    selector: 'app-view917512',
    templateUrl: './view917512.component.html',
    styleUrls: ['./view917512.component.scss']
})
export class View917512Component {
    @Input() show971512: boolean;
    @Input() note_selected: NoteBcbaV2;
}
