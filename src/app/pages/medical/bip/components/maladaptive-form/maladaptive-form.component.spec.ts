import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladaptiveFormComponent } from './maladaptive-form.component';

describe('MaladaptiveFormComponent', () => {
  let component: MaladaptiveFormComponent;
  let fixture: ComponentFixture<MaladaptiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaladaptiveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaladaptiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
