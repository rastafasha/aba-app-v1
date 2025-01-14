import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileFamilyComponent } from './bip-profile-family.component';

describe('BipProfileFamilyComponent', () => {
  let component: BipProfileFamilyComponent;
  let fixture: ComponentFixture<BipProfileFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileFamilyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
