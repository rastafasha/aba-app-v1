import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipProfileGeneralizationComponent } from './bip-profile-generalization.component';

describe('BipProfileGeneralizationComponent', () => {
  let component: BipProfileGeneralizationComponent;
  let fixture: ComponentFixture<BipProfileGeneralizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipProfileGeneralizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipProfileGeneralizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
