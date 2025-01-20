import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Show917511Component } from './show917511.component';

describe('Show917511Component', () => {
    let component: Show917511Component;
    let fixture: ComponentFixture<Show917511Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ Show917511Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Show917511Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});