import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileAssestmentComponent } from './bip-profile-assestment.component';

describe('BipProfileAssestmentComponent', () => {
  let component: BipProfileAssestmentComponent;
  let fixture: ComponentFixture<BipProfileAssestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileAssestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileAssestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
