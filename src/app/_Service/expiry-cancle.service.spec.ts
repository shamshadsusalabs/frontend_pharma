import { TestBed } from '@angular/core/testing';

import { ExpiryCancleService } from './expiry-cancle.service';

describe('ExpiryCancleService', () => {
  let service: ExpiryCancleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpiryCancleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
