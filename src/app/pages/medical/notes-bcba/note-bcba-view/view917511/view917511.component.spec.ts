import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { View917511Component } from './view917511.component';

describe('View917511Component', () => {
    let component: View917511Component;
    let fixture: ComponentFixture<View917511Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ View917511Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(View917511Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});