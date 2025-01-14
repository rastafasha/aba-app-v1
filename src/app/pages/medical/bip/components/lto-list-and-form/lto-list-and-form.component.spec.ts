import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtoListAndFormComponent } from './lto-list-and-form.component';

describe('LtoListAndFormComponent', () => {
  let component: LtoListAndFormComponent;
  let fixture: ComponentFixture<LtoListAndFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtoListAndFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LtoListAndFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
