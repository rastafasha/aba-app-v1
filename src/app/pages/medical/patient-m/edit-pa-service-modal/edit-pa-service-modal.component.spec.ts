import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaServiceModalComponent } from './edit-pa-service-modal.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

describe('EditPaServiceModalComponent', () => {
  let component: EditPaServiceModalComponent;
  let fixture: ComponentFixture<EditPaServiceModalComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaServiceModalComponent ],
      imports: [ MaterialModule, SharedModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPaServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
