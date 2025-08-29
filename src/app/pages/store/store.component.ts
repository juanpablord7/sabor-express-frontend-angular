import { Component, inject, signal } from '@angular/core';
import Category from '../../core/models/category.model';
import { NgClass } from "@angular/common";
import { StoreItemComponent } from "./components/store-item/store-item.component";
import { ProductService } from '../../features/product/services/product.service';
import { CategoryService } from '../../features/category/services/category.service';
import { ImageApiService } from '../../core/services/api/image-api.service';

@Component({
  selector: 'app-store',
  imports: [NgClass, StoreItemComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  categoryService = inject(CategoryService);
  productService = inject(ProductService);

  imageApiService = inject(ImageApiService);

  imagePath = this.imageApiService.getImageUrl

  categories: Category[] = this.categoryService.categories();

  products = this.productService.products;

  selectedCategory = this.productService.selectedCategory

  limit = this.productService.limit;

  
  changeLimit(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.productService.limit.set(Number(select.value));
  }

  handleCategorySelect = (newSelected: number|undefined) => {
    this.productService.selectedCategory.set(newSelected);
  }
}
