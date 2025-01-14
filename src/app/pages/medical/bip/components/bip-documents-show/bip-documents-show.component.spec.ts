import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipDocumentsShowComponent } from './bip-documents-show.component';

describe('BipDocumentsShowComponent', () => {
  let component: BipDocumentsShowComponent;
  let fixture: ComponentFixture<BipDocumentsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipDocumentsShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipDocumentsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
