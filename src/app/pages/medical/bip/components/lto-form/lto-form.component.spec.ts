import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtoFormComponent } from './lto-form.component';

describe('LtoFormComponent', () => {
  let component: LtoFormComponent;
  let fixture: ComponentFixture<LtoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LtoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
