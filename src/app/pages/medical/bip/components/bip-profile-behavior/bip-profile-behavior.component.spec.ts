import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileBehaviorComponent } from './bip-profile-behavior.component';

describe('BipProfileBehaviorComponent', () => {
  let component: BipProfileBehaviorComponent;
  let fixture: ComponentFixture<BipProfileBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileBehaviorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
