import { TestBed } from '@angular/core/testing';

import { ProductManagmentService } from './product-managment.service';

describe('ProductManagmentService', () => {
  let service: ProductManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
