import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesDatatablesComponent } from './tables-datatables.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TablesDatatablesComponent', () => {
  let component: TablesDatatablesComponent;
  let fixture: ComponentFixture<TablesDatatablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesDatatablesComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesDatatablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
