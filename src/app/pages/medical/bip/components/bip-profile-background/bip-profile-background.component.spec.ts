import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileBackgroundComponent } from './bip-profile-background.component';

describe('BipProfileBackgroundComponent', () => {
  let component: BipProfileBackgroundComponent;
  let fixture: ComponentFixture<BipProfileBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
