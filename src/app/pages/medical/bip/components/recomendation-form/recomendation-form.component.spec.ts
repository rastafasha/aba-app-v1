import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationFormComponent } from './recomendation-form.component';

describe('RecomendationFormComponent', () => {
  let component: RecomendationFormComponent;
  let fixture: ComponentFixture<RecomendationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
