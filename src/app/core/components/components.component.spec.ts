import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsComponent } from './components.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ComponentsComponent', () => {
  let component: ComponentsComponent;
  let fixture: ComponentFixture<ComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentsComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
