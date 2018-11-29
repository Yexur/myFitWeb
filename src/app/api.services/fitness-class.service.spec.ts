import { TestBed } from '@angular/core/testing';

import { FitnessClassService } from './fitness-class.service';

describe('FitnessClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FitnessClassService = TestBed.get(FitnessClassService);
    expect(service).toBeTruthy();
  });
});
