import { TestBed, inject } from '@angular/core/testing';

import { LocalQuoteService } from './local-quote.service';

describe('LocalQuoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalQuoteService]
    });
  });

  it('should be created', inject([LocalQuoteService], (service: LocalQuoteService) => {
    expect(service).toBeTruthy();
  }));
});
