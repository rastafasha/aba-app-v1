import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileReductionsComponent } from './bip-profile-reductions.component';

describe('BipProfileReductionsComponent', () => {
  let component: BipProfileReductionsComponent;
  let fixture: ComponentFixture<BipProfileReductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileReductionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileReductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
