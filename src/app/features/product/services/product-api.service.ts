import { inject, Injectable, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Product, { ProductCreate, ProductUpdate } from '../../../core/models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor() { }

  httpClient = inject(HttpClient)

  private apiUrl = "http://localhost:8082/product";

  limit = signal(0);
  page = signal(0);
  selectedCategory = signal<number|undefined>(undefined);

  getAllProducts(limit: number, page: number){
    return this.httpClient.get<Product[]>
    (`${this.apiUrl}?page=${this.page()}&limit=${this.limit()}`);
  }

  findProductsById(idProducts: number[]){
    // Transform the list of ids into a list: [1,4,8,10]
    const idList = idProducts.join(',');

    return this.httpClient.get<Product[]>
    (`${this.apiUrl}?find=${idList}`);
  }

  createProduct(newProduct: ProductCreate){
    return this.httpClient.post<Product>(this.apiUrl, newProduct);
  }

  replaceProduct(id: number, productReplace: ProductCreate){
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, productReplace);
  }
  

  updateProduct(id: number, productUpdate: ProductUpdate){
    return this.httpClient.patch<Product>(`${this.apiUrl}/${id}`, productUpdate);
  }

  deleteProduct(id: number){
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
