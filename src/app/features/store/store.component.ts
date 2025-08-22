import { Component } from '@angular/core';
import Category from '../../core/models/category.model';
import { NgClass } from "@angular/common";
import Product from '../../core/models/product.model';
import { StoreItemComponent } from './components/store-item/store-item.component';

@Component({
  selector: 'app-store',
  imports: [NgClass, StoreItemComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  imagePath = ""

  limit = 0
  loading = false

  categories: Category[] = []

  products: Product[] = [
    {id: 1, name: "Hamburg", price: 10.99, category: 1,image: "ham.png"}
  ]

  selectedCategory: number | undefined;

  handleCategorySelect(id?: number){

  }

  changeLimit(){

  }

}
