import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladaptivesComponent } from './maladaptives.component';

describe('MaladaptivesComponent', () => {
  let component: MaladaptivesComponent;
  let fixture: ComponentFixture<MaladaptivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaladaptivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaladaptivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
