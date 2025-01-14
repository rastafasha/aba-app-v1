import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileDeEscalationComponent } from './bip-profile-de-escalation.component';

describe('BipProfileDeEscalationComponent', () => {
  let component: BipProfileDeEscalationComponent;
  let fixture: ComponentFixture<BipProfileDeEscalationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileDeEscalationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileDeEscalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
