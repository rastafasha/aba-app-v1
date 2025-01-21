import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionviewsComponent } from './interventionviews.component';

describe('InterventionviewsComponent', () => {
    let component: InterventionviewsComponent;
    let fixture: ComponentFixture<InterventionviewsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ InterventionviewsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterventionviewsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});