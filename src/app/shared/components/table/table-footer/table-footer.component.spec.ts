import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFooterComponent } from './table-footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('TableFooterComponent', () => {
  let component: TableFooterComponent;
  let fixture: ComponentFixture<TableFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [TableFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
