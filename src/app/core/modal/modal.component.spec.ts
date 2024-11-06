import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
