import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiV2Response, BipV2, ListResponse } from 'src/app/core/models';
import { BipsV2Service } from 'src/app/core/services';
import { BipUseCasesService } from './bip-use-cases.service';

// Update createMockBip with proper replacements data
const createMockBip = (): BipV2 => {
  const bip = BipV2.getDefault();
  bip.id = 1;
  bip.client_id = 123;
  return bip;
};

const createMockOldBip = (): BipV2 => {
  const bip = createMockBip();
  return new BipV2(JSON.parse(JSON.stringify(bip)));
};

// Update createMockApiResponse to match ApiV2Response format
const createMockApiResponse = (data: BipV2): ApiV2Response<BipV2> => {
  return {
    status: 'success',
    data: new BipV2(data),
  };
};

// Fix createMockListResponse to match ListResponse interface
const createMockListResponse = (data: BipV2[]): ListResponse<BipV2> => {
  return {
    data,
    status: 'success',
    first_page_url: 'http://example.com/api/v2/bips?page=1',
    from: 1,
    last_page: 1,
    last_page_url: 'http://example.com/api/v2/bips?page=1',
    next_page_url: null,
    path: 'http://example.com/api/v2/bips',
    per_page: 15,
    prev_page_url: null,
    to: data.length,
    total: data.length,
  };
};

describe('BipUseCasesService', () => {
  let service: BipUseCasesService;
  let bipServiceSpy: jasmine.SpyObj<BipsV2Service>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BipsV2Service', [
      'list',
      'get',
      'update',
    ]);
    TestBed.configureTestingModule({
      providers: [
        BipUseCasesService,
        { provide: BipsV2Service, useValue: spy },
      ],
    });
    service = TestBed.inject(BipUseCasesService);
    bipServiceSpy = TestBed.inject(
      BipsV2Service
    ) as jasmine.SpyObj<BipsV2Service>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBipByClientId', () => {
    it('should fetch and transform bip data', (done) => {
      const mockBip = createMockBip();
      const mockListResponse = createMockListResponse([mockBip]);
      const mockApiResponse = createMockApiResponse(mockBip);

      bipServiceSpy.list.and.returnValue(of(mockListResponse));
      bipServiceSpy.get.and.returnValue(of(mockApiResponse));

      service.getBipByClientId(123).subscribe((result) => {
        expect(bipServiceSpy.list).toHaveBeenCalledWith({ client_id: 123 });
        expect(bipServiceSpy.get).toHaveBeenCalledWith(mockBip.id);
        expect(result.status).toBe('success');
        done();
      });
    });
  });

  describe('save', () => {
    it('should update bip', (done) => {
      const mockBip = createMockBip();
      const mockOldBip = createMockOldBip();
      const mockResponse = createMockApiResponse(mockBip);

      bipServiceSpy.update.and.returnValue(of(mockResponse));

      service.save(mockBip, mockOldBip).subscribe((result) => {
        expect(bipServiceSpy.update).toHaveBeenCalledWith(mockBip, mockBip.id);
        expect(result).toEqual(mockResponse);
        done();
      });
    });
  });
});
