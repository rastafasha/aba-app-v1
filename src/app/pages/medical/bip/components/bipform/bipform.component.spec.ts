import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipFormComponent } from './bipform.component';

describe('BipformComponent', () => {
  let component: BipFormComponent;
  let fixture: ComponentFixture<BipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BipFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
