import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomicidalitiesComponent } from './homicidalities.component';

describe('HomicidalitiesComponent', () => {
  let component: HomicidalitiesComponent;
  let fixture: ComponentFixture<HomicidalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomicidalitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomicidalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
