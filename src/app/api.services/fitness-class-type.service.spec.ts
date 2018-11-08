import { TestBed } from '@angular/core/testing';

import { FitnessClassTypeService } from './fitness-class-type.service';

describe('FitnessClassTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FitnessClassTypeService = TestBed.get(FitnessClassTypeService);
    expect(service).toBeTruthy();
  });
});
