import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileHeadComponent } from './bip-profile-head.component';

describe('BipProfileHeadComponent', () => {
  let component: BipProfileHeadComponent;
  let fixture: ComponentFixture<BipProfileHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
