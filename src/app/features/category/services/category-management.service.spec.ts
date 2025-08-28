import { TestBed } from '@angular/core/testing';

import { CategoryManagementService } from './category-management.service';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CategoryApiService } from './category-api.service';

describe('CategoryManagementService', () => {
  let service: CategoryManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryManagementService,
        CategoryApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CategoryManagementService);
  });

  it('should be created', () => {
    const service = TestBed.inject(CategoryApiService);
    expect(service).toBeTruthy();
  });
});
