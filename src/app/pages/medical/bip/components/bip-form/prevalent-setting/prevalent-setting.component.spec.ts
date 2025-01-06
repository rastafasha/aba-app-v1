import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevalentSettingComponent } from './prevalent-setting.component';

describe('PrevalentSettingComponent', () => {
  let component: PrevalentSettingComponent;
  let fixture: ComponentFixture<PrevalentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevalentSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevalentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
