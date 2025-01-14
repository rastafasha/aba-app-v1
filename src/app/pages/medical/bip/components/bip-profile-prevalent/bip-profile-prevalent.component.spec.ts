import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfilePrevalentComponent } from './bip-profile-prevalent.component';

describe('BipProfilePrevalentComponent', () => {
  let component: BipProfilePrevalentComponent;
  let fixture: ComponentFixture<BipProfilePrevalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfilePrevalentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfilePrevalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
