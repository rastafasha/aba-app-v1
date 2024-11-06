import { TestBed } from '@angular/core/testing';
import { RoleFilterPipe } from './roles-filter.pipe';

describe('RoleFilterPipe', () => {
  let pipe: RoleFilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleFilterPipe],
    });

    pipe = TestBed.inject(RoleFilterPipe);
  });

  it('debería filtrar los roles que son RBT o BCBA', () => {
    const roles = [{ name: 'RBT' }, { name: 'BCBA' }, { name: 'OTRO' }];
    expect(pipe.transform(roles)).toEqual([{ name: 'RBT' }, { name: 'BCBA' }]);
  });
});
