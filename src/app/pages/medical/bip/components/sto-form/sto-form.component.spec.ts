import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoFormComponent } from './sto-form.component';

describe('StoFormComponent', () => {
  let component: StoFormComponent;
  let fixture: ComponentFixture<StoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
