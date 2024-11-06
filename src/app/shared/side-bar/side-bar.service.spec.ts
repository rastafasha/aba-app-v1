import { TestBed } from '@angular/core/testing';

import { SideBarService } from './side-bar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SideBarService', () => {
  let service: SideBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SideBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
