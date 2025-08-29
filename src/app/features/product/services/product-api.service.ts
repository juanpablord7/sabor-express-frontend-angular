import { inject, Injectable, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Product, { ProductCreate, ProductUpdate } from '../../../core/models/product.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor() { }

  private http = inject(HttpClient)
  private apiService = inject(ApiService)

  private apiUrl = this.apiService.apiUrl;

  limit = signal(0);
  page = signal(0);
  selectedCategory = signal<number|undefined>(undefined);

  getAllProducts(limit: number, page: number){
    return this.http.get<Product[]>
    (`${this.apiUrl}?page=${this.page()}&limit=${this.limit()}`);
  }

  findProductsById(idProducts: number[]){
    // Transform the list of ids into a list: [1,4,8,10]
    const idList = idProducts.join(',');

    return this.http.get<Product[]>
    (`${this.apiUrl}?find=${idList}`);
  }

  createProduct(newProduct: ProductCreate){
    return this.http.post<Product>(this.apiUrl, newProduct);
  }

  replaceProduct(id: number, productReplace: ProductCreate){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productReplace);
  }
  
  updateProduct(id: number, productUpdate: ProductUpdate){
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, productUpdate);
  }

  deleteProduct(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
