import { TestBed, inject } from '@angular/core/testing';

import { QuandlQuoteServiceService } from './quandl-quote-service.service';

describe('QuandlQuoteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuandlQuoteServiceService]
    });
  });

  it('should be created', inject([QuandlQuoteServiceService], (service: QuandlQuoteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
