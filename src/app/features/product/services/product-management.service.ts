import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Product, { ProductCreate, ProductUpdate } from '../../../core/models/product.model';
import { ProductService } from './product.service';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  productService = inject(ProductService);

  productApiService = inject(ProductApiService);

  constructor() { 
  }

  createProduct(newProduct: ProductCreate){
    this.productApiService.createProduct(newProduct).subscribe({
      next: (created: Product) => {
        console.log('Product created: ', created);

        this.productService.products.reload()
      },
      error: (err: any) => console.error('Error creating product: ', err),
    })
  }

  replaceProduct(id: number, productReplace: ProductCreate){
    this.productApiService.replaceProduct(id, productReplace).subscribe({
      next: (replaced: Product) => {
        console.log('Product replaced: ', replaced);
        
        this.productService.products.reload()
      },
      error: (err: any) => console.error('Error replacing product: ', err),
    })
  }

  updateProduct(id: number, productUpdate: ProductUpdate){
    this.productApiService.updateProduct(id, productUpdate).subscribe({
      next: (replaced: Product) => {
        console.log('Product updated: ', replaced);
        
        this.productService.products.reload()
      },
      error: (err: any) => console.error('Error updating product: ', err),
    })
  }

  deleteProduct(id: number){
    this.productApiService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted Id: ', id);

        this.productService.products.reload()
      },
      error: (err: any) => console.error('Error deleting product: ', err),
    })
  }
}
