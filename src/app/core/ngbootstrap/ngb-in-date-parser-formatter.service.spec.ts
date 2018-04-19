import { TestBed, inject } from '@angular/core/testing';

import { NgbInDateParserFormatterService } from './ngb-in-date-parser-formatter.service';

describe('NgbInDateParserFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbInDateParserFormatterService]
    });
  });

  it('should be created', inject([NgbInDateParserFormatterService], (service: NgbInDateParserFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
