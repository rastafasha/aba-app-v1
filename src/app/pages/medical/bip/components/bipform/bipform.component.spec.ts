import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipFormComponent } from './bipform.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('BipformComponent', () => {
  let component: BipFormComponent;
  let fixture: ComponentFixture<BipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BipFormComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
