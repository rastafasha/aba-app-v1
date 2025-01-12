import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladaptiveGoalsTableComponent } from './maladaptive-goals-table.component';

describe('MaladaptiveGoalsTableComponent', () => {
  let component: MaladaptiveGoalsTableComponent;
  let fixture: ComponentFixture<MaladaptiveGoalsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaladaptiveGoalsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaladaptiveGoalsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
