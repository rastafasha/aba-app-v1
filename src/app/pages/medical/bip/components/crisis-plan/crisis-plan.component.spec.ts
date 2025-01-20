import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisisPlanComponent } from './crisis-plan.component';

describe('CrisisPlanComponent', () => {
  let component: CrisisPlanComponent;
  let fixture: ComponentFixture<CrisisPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrisisPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrisisPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
