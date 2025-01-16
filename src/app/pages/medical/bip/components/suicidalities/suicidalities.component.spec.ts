import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuicidalitiesComponent } from './suicidalities.component';

describe('SuicidalitiesComponent', () => {
  let component: SuicidalitiesComponent;
  let fixture: ComponentFixture<SuicidalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuicidalitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuicidalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
