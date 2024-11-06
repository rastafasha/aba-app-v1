import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UikitComponent } from './uikit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('UikitComponent', () => {
  let component: UikitComponent;
  let fixture: ComponentFixture<UikitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UikitComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UikitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
