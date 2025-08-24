import { Component, inject, signal } from '@angular/core';
import Category from '../../core/models/category.model';
import { NgClass } from "@angular/common";
import { ProductService } from '../../core/services/product/product.service';
import { StoreItemComponent } from "./components/store-item/store-item.component";

@Component({
  selector: 'app-store',
  imports: [NgClass, StoreItemComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  productService = inject(ProductService)

  products = this.productService.products;

  selectedCategory = this.productService.selectedCategory

  limit = this.productService.limit;

  changeLimit(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.productService.limit.set(Number(select.value));
  }

  imagePath = ""

  categories: Category[] = []

  handleCategorySelect = (newSelected: number|undefined) => {
    this.productService.selectedCategory.set(newSelected);
  }
}
