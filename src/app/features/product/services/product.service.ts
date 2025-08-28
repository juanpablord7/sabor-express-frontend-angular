import { effect, inject, Injectable, resource, signal } from '@angular/core';
import Product from '../../../core/models/product.model';

import { firstValueFrom } from 'rxjs';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productApiService = inject(ProductApiService);

  constructor() { 
  }

  limit = signal(0);
  page = signal(0);
  selectedCategory = signal<number|undefined>(undefined);

  products = resource({
    request: () => ({limit: this.limit(), page: this.page()}),
    loader: ({request}) => firstValueFrom(
      this.productApiService.getAllProducts(request.limit, request.page)
    )
  });

  findProducts(ids: number[]){
    return this.productApiService.findProductsById(ids)
  }

}
