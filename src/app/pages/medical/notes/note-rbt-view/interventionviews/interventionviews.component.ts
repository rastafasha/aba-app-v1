import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-interventionviews',
    templateUrl: './interventionviews.component.html',
    styleUrls: ['./interventionviews.component.scss']
})
export class InterventionviewsComponent {
    @Input() intervention
}