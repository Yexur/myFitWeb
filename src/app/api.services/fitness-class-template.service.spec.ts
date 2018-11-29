import { TestBed } from '@angular/core/testing';

import { FitnessClassTemplateService } from './fitness-class-template.service';

describe('FitnessClassTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FitnessClassTemplateService = TestBed.get(FitnessClassTemplateService);
    expect(service).toBeTruthy();
  });
});
