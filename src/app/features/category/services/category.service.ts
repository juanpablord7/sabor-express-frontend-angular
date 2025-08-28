import { inject, Injectable, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CategoryApiService } from './category-api.service';
import Category from '../../../core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryApiService = inject(CategoryApiService);

  constructor() { 
    this.loadCategories()
  }

  categories = signal<Category[]>([]);

  loadCategories(){
    this.categoryApiService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        //Reload the categories
        this.categories.set(categories);
      },
      error: (err: any) => console.error('Error getting all the categories: ', err),
    })
  }
}
