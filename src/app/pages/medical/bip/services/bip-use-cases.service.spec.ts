import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  ApiV2Response,
  BipV2,
  PlanV2,
  ListResponse,
} from 'src/app/core/models';
import { BipsV2Service, PlansV2Service } from 'src/app/core/services';
import { BipUseCasesService } from './bip-use-cases.service';

// Helper functions
const createMockPlan = (id = 0, changes: Partial<PlanV2> = {}): PlanV2 => {
  const plan = new PlanV2({
    id,
    bip_id: 1,
    name: 'Test Plan',
    description: 'Test Description',
    category: 'maladaptive',
    status: 'active',
    baseline_level: 0,
    baseline_date: new Date(),
    initial_intensity: 0,
    current_intensity: 0,
    objectives: [],
    ...changes,
  });
  return plan;
};

const createMockBip = (maladaptives: PlanV2[] = []): BipV2 => {
  const bip = BipV2.getDefault();
  bip.id = 1;
  bip.client_id = 123;
  bip.maladaptives = maladaptives;
  return bip;
};

const createMockOldBip = (): BipV2 => {
  const bip = createMockBip();
  return new BipV2(JSON.parse(JSON.stringify(bip)));
};

const createMockApiResponse = <T = never>(data: object): ApiV2Response<T> => ({
  status: 'success',
  data: data as T,
});

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
  let planServiceSpy: jasmine.SpyObj<PlansV2Service>;

  beforeEach(() => {
    const bipSpy = jasmine.createSpyObj('BipsV2Service', [
      'list',
      'get',
      'update',
    ]);
    const planSpy = jasmine.createSpyObj('PlansV2Service', [
      'create',
      'update',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        BipUseCasesService,
        { provide: BipsV2Service, useValue: bipSpy },
        { provide: PlansV2Service, useValue: planSpy },
      ],
    });

    service = TestBed.inject(BipUseCasesService);
    bipServiceSpy = TestBed.inject(
      BipsV2Service
    ) as jasmine.SpyObj<BipsV2Service>;
    planServiceSpy = TestBed.inject(
      PlansV2Service
    ) as jasmine.SpyObj<PlansV2Service>;

    // Setup default spy responses
    bipServiceSpy.update.and.returnValue(of(createMockApiResponse({})));
    planServiceSpy.create.and.returnValue(of(createMockApiResponse({})));
    planServiceSpy.update.and.returnValue(of(createMockApiResponse({})));
    planServiceSpy.delete.and.returnValue(of(createMockApiResponse({})));
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

  describe('save - maladaptive plans', () => {
    it('should create new maladaptive plan', (done) => {
      const newPlan = createMockPlan(0);
      const newBip = createMockBip([newPlan]);
      const oldBip = createMockBip([]);

      service.save(newBip, oldBip).subscribe(() => {
        expect(planServiceSpy.create).toHaveBeenCalledWith(newPlan);
        expect(planServiceSpy.update).not.toHaveBeenCalled();
        expect(planServiceSpy.delete).not.toHaveBeenCalled();
        done();
      });
    });

    it('should update existing maladaptive plan', (done) => {
      const oldPlan = createMockPlan(1);
      const updatedPlan = createMockPlan(1, { name: 'Updated Plan' });
      const newBip = createMockBip([updatedPlan]);
      const oldBip = createMockBip([oldPlan]);

      service.save(newBip, oldBip).subscribe(() => {
        expect(planServiceSpy.update).toHaveBeenCalledWith(
          updatedPlan,
          updatedPlan.id
        );
        expect(planServiceSpy.create).not.toHaveBeenCalled();
        expect(planServiceSpy.delete).not.toHaveBeenCalled();
        done();
      });
    });

    it('should delete removed maladaptive plan', (done) => {
      const planToDelete = createMockPlan(1);
      const newBip = createMockBip([]);
      const oldBip = createMockBip([planToDelete]);

      service.save(newBip, oldBip).subscribe(() => {
        expect(planServiceSpy.delete).toHaveBeenCalledWith(planToDelete.id);
        expect(planServiceSpy.create).not.toHaveBeenCalled();
        expect(planServiceSpy.update).not.toHaveBeenCalled();
        done();
      });
    });

    it('should not call any plan service when no changes', (done) => {
      const plan = createMockPlan(1);
      const newBip = createMockBip([plan]);
      const oldBip = createMockBip([plan]);

      service.save(newBip, oldBip).subscribe(() => {
        expect(planServiceSpy.create).not.toHaveBeenCalled();
        expect(planServiceSpy.update).not.toHaveBeenCalled();
        expect(planServiceSpy.delete).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
