import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoInfoComponent } from './no-info.component';

describe('NoInfoComponent', () => {
  let component: NoInfoComponent;
  let fixture: ComponentFixture<NoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
