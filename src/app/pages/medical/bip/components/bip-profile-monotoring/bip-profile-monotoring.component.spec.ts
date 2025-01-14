import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileMonotoringComponent } from './bip-profile-monotoring.component';

describe('BipProfileMonotoringComponent', () => {
  let component: BipProfileMonotoringComponent;
  let fixture: ComponentFixture<BipProfileMonotoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileMonotoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileMonotoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
