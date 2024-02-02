import { TestBed } from '@angular/core/testing';

import { ExpressdbService } from './expressdb.service';

describe('ExpressdbService', () => {
  let service: ExpressdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
