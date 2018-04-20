import { TestBed, inject } from '@angular/core/testing';

import { BatchLogService } from './batch-log.service';

describe('BatchLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchLogService]
    });
  });

  it('should be created', inject([BatchLogService], (service: BatchLogService) => {
    expect(service).toBeTruthy();
  }));
});
