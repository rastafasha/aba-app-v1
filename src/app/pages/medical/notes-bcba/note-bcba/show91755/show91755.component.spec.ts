import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Show91755Component } from './show91755.component';

describe('Show91755Component', () => {
    let component: Show91755Component;
    let fixture: ComponentFixture<Show91755Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ Show91755Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Show91755Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});