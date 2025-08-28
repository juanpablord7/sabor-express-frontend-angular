import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Category, { CategoryCreate, CategoryUpdate } from '../../../core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  http = inject(HttpClient)

  private apiUrl = "http://localhost:8082/product";

  constructor() { }

  getAllCategories(){
    return this.http.get<Category[]>(this.apiUrl)
  }

  createCategory(newCategory: CategoryCreate){
    return this.http.post<Category>(this.apiUrl, newCategory);
  }

  replaceCategory(id: number, categoryReplace: CategoryCreate){
    return this.http.put<Category>(`${this.apiUrl}/${id}`, categoryReplace);
  }

  updateCategory(id: number, categoryUpdate: CategoryUpdate){
    return this.http.patch<Category>(`${this.apiUrl}/${id}`, categoryUpdate);
  }

  deleteCategory(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
