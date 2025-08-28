import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { CategoryApiService } from './category-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        CategoryApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
    ],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    const service = TestBed.inject(CategoryApiService);
    expect(service).toBeTruthy();
  });
});
