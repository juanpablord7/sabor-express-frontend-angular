import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Product, { CreateProductSchema } from '../../../core/models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductManagmentService {

  httpClient = inject(HttpClient)

  productService = inject(ProductService);

  constructor() { 
  }

  private apiUrl = "http://localhost:8082/product";
  
  createProduct(newProduct: CreateProductSchema){
    this.httpClient.post<Product>(this.apiUrl, newProduct).subscribe({
      next: (created) => {
        console.log('Product created: ', created);

        this.productService.products.reload()
      },
      error: (err) => console.error('Error creating product: ', err),
    })
  }

  replaceProduct(id: number, productReplace: CreateProductSchema){
    this.httpClient.put<Product>(`${this.apiUrl}/${id}`, productReplace).subscribe({
      next: (replaced) => {
        console.log('Product replaced: ', replaced);
        
        this.productService.products.reload()
      },
      error: (err) => console.error('Error replacing product: ', err),
    })
  }

  updateProduct(id: number, productUpdate: CreateProductSchema){
    this.httpClient.patch<Product>(`${this.apiUrl}/${id}`, productUpdate).subscribe({
      next: (replaced) => {
        console.log('Product updated: ', replaced);
        
        this.productService.products.reload()
      },
      error: (err) => console.error('Error updating product: ', err),
    })
  }

  deleteProduct(id: number){
    this.httpClient.delete(`${this.apiUrl}/${id}`).subscribe({
      next: (replaced) => {
        console.log('Product updated: ', replaced);
       
        this.productService.products.reload()
      },
      error: (err) => console.error('Error updating product: ', err),
    })
  }
}
