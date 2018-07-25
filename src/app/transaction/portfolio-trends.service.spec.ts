import { TestBed, inject } from '@angular/core/testing';

import { PortfolioTrendsService } from './portfolio-trends.service';

describe('PortfolioTrendsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioTrendsService]
    });
  });

  it('should be created', inject([PortfolioTrendsService], (service: PortfolioTrendsService) => {
    expect(service).toBeTruthy();
  }));
});
