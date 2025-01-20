import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { View91756Component } from './view91756.component';

describe('View91756Component', () => {
    let component: View91756Component;
    let fixture: ComponentFixture<View91756Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ View91756Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(View91756Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});