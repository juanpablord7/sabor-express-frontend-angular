import { TestBed } from '@angular/core/testing';

import { FormatCurrencyService } from './format-currency.service';

describe('FormatCurrencyService', () => {
  let service: FormatCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
