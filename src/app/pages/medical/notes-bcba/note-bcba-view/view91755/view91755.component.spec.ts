import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { View91755Component } from './view91755.component';

describe('View91755Component', () => {
    let component: View91755Component;
    let fixture: ComponentFixture<View91755Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ View91755Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(View91755Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});