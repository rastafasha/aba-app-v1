import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankPageComponent } from './blank-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlankPageComponent', () => {
  let component: BlankPageComponent;
  let fixture: ComponentFixture<BlankPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlankPageComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BlankPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
