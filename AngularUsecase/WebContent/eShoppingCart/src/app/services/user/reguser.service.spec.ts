import { TestBed } from '@angular/core/testing';

import { ReguserService } from './reguser.service';

describe('ReguserService', () => {
  let service: ReguserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReguserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
