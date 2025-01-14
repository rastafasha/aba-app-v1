import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoListAndFormComponent } from './sto-list-and-form.component';

describe('StoListAndFormComponent', () => {
  let component: StoListAndFormComponent;
  let fixture: ComponentFixture<StoListAndFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoListAndFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoListAndFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
