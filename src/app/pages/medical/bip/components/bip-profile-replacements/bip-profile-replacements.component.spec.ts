import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileReplacementsComponent } from './bip-profile-replacements.component';

describe('BipProfileReplacementsComponent', () => {
  let component: BipProfileReplacementsComponent;
  let fixture: ComponentFixture<BipProfileReplacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileReplacementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileReplacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
