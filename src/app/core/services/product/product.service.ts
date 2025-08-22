import { inject, Injectable, signal, Signal } from '@angular/core';
import Product from '../../models/product.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpClient = inject(HttpClient)

  constructor() { }

  private apiUrl = "http://localhost:8082/product";

  private products = signal<Product[]>([]);

  // Devuelve un observable que el componente puede usar
  getProducts(){
    this.httpClient.get<Product[]>(this.apiUrl).subscribe(
      response => this.products.set(response),
      error => console.log(error)
    );
  }
}
