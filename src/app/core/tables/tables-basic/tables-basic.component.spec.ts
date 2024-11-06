import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesBasicComponent } from './tables-basic.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('TablesBasicComponent', () => {
  let component: TablesBasicComponent;
  let fixture: ComponentFixture<TablesBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesBasicComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
