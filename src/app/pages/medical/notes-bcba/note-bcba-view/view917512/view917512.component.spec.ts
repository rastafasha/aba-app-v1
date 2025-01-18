import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { View917512Component } from './view917512.component';

describe('View917512Component', () => {
    let component: View917512Component;
    let fixture: ComponentFixture<View917512Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ View917512Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(View917512Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});