import { TestBed } from '@angular/core/testing';

import { ProductManagementService } from './product-management.service';
import { ProductApiService } from './product-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductManagementService', () => {
  let service: ProductManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductApiService
      ],
    });
    service = TestBed.inject(ProductManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
