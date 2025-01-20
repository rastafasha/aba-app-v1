import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Show917512Component } from './show917512.component';

describe('Show917512Component', () => {
    let component: Show917512Component;
    let fixture: ComponentFixture<Show917512Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ Show917512Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Show917512Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});