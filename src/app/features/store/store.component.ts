import { Component, inject } from '@angular/core';
import Category from '../../core/models/category.model';
import { NgClass } from "@angular/common";
import Product from '../../core/models/product.model';
import { StoreItemComponent } from './components/store-item/store-item.component';
import { ProductService } from '../../core/services/product/product.service';

@Component({
  selector: 'app-store',
  imports: [NgClass, StoreItemComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

  productService = inject(ProductService)

  imagePath = ""

  limit = 0
  loading = false

  categories: Category[] = []

  products: Product[] =  this.productService.products

  selectedCategory: number | undefined;

  handleCategorySelect(id?: number){

  }

  changeLimit(){

  }

}
