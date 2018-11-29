import { TestBed } from '@angular/core/testing';

import { ManageAttendeesService } from './manage-attendees.service';

describe('ManageAttendeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAttendeesService = TestBed.get(ManageAttendeesService);
    expect(service).toBeTruthy();
  });
});
