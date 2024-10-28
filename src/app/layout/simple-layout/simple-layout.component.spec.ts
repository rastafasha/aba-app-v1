import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLayoutComponent } from './simple-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('SimpleLayoutComponent', () => {
  let component: SimpleLayoutComponent;
  let fixture: ComponentFixture<SimpleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleLayoutComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
