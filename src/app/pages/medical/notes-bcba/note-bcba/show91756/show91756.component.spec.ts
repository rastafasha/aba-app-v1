import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Show91756Component } from './show91756.component';

describe('Show91756Component', () => {
    let component: Show91756Component;
    let fixture: ComponentFixture<Show91756Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ Show91756Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Show91756Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});