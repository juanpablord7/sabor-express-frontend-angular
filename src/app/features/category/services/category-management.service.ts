import { inject, Injectable } from '@angular/core';
import { CategoryApiService } from './category-api.service';
import Category, { CategoryCreate, CategoryUpdate } from '../../../core/models/category.model';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {

  categoryApiService = inject(CategoryApiService);
  categoryService = inject(CategoryService);

  constructor() { }

  createProduct(newCategory: CategoryCreate){
    this.categoryApiService.createCategory(newCategory).subscribe({
      next: (created: Category) => {
        console.log('Category created: ', created);

        //Reload the categories
        this.categoryService.loadCategories();
      },
      error: (err: any) => console.error('Error creating product: ', err),
    })
  }

  replaceProduct(id: number, categoryReplace: CategoryCreate){
    this.categoryApiService.replaceCategory(id, categoryReplace).subscribe({
      next: (replaced: Category) => {
        console.log('Category replaced: ', replaced);
        
        //Reload the categories
        this.categoryService.loadCategories();
      },
      error: (err: any) => console.error('Error replacing product: ', err),
    })
  }

  updateProduct(id: number, categoryUpdate: CategoryUpdate){
    this.categoryApiService.updateCategory(id, categoryUpdate).subscribe({
      next: (replaced: Category) => {
        console.log('Product updated: ', replaced);
        
        //Reload the categories
        this.categoryService.loadCategories();
      },
      error: (err: any) => console.error('Error updating product: ', err),
    })
  }

  deleteProduct(id: number){
    this.categoryApiService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Category deleted Id: ', id);

        //Reload the categories
        this.categoryService.loadCategories();
      },
      error: (err: any) => console.error('Error deleting product: ', err),
    })
  }
}
