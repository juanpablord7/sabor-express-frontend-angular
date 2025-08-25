import { effect, inject, Injectable, resource, signal } from '@angular/core';
import Product, { CreateProductSchema } from '../../../core/models/product.model';

import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpClient = inject(HttpClient)

  constructor() { 
  }

  private apiUrl = "http://localhost:8082/product";

  limit = signal(0);
  page = signal(0);
  selectedCategory = signal<number|undefined>(undefined);

  products = resource({
    request: () => ({limit: this.limit(), page: this.page()}),
    loader: ({request}) => firstValueFrom(
      this.httpClient.get<Product[]>(`${this.apiUrl}?page=${request.page}&limit=${request.limit}`)
    )
  });

}
